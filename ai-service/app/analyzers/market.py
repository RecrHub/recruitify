import json
import logging
import re
from statistics import mean

from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma

from app.config import CHROMA_DIR, EMBED_MODEL
from app.formatters import format_job_text, word_count, _location_key
from app.llm.client import generate_advice

logger = logging.getLogger(__name__)

SEARCH_K = 15


def get_db():
    embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
    return Chroma(
        collection_name="jobs_market",
        embedding_function=embeddings,
        persist_directory=CHROMA_DIR,
    )

def _fmt_salary(lo, hi) -> str:
    lo = lo or 0
    hi = hi or 0
    if not lo and not hi:
        return "Not available"
    if lo and hi:
        return f"{lo:,.0f} - {hi:,.0f}"
    return f"{(lo or hi):,.0f}"


def _fmt_location(ward: str, province: str) -> str:
    parts = [p.strip() for p in (ward, province) if p and p.strip()]
    return ", ".join(parts) if parts else "Not available"


def _field_bonus(job, meta: dict) -> float:
    """Điểm thưởng cho các field cấu trúc khớp nhau, cộng vào điểm rank cuối cùng
    bên cạnh điểm semantic similarity từ title/skills/description.
    Location được ưu tiên cao nhất vì ta muốn benchmark cùng khu vực.
    """
    bonus = 0.0
    job_loc = _location_key(job.ward, job.province)
    meta_loc = _location_key(meta.get("ward", ""), meta.get("province", ""))
    if job_loc and job_loc == meta_loc:
        bonus += 0.25
    if job.experience_level and job.experience_level == meta.get("experience_level"):
        bonus += 0.10
    if job.work_approach and job.work_approach == meta.get("work_approach"):
        bonus += 0.05
    if job.employment_type and job.employment_type == meta.get("employment_type"):
        bonus += 0.05
    return bonus


def _rank_candidates(
    raw: list,
    job,
    *,
    strategy: str = "performance",
    min_similarity: float = 0.45,
    perf_view_weight: float = 0.05,
):
    """Pure ranking — không phụ thuộc Chroma, dễ test với MockDoc.

    Trả về (top_meta, top_distance, candidates) cùng shape với find_benchmark_job
    cũ để caller (analyze_market) không cần đổi.

    Strategies:
    - "performance" (mặc định mới): trong nhóm similarity >= min_similarity,
      sort theo applied + view*perf_view_weight → pick job THÀNH CÔNG cùng loại.
      Fix vấn đề cũ: code cũ pick job GIỐNG NHẤT dù nó cũng đang chết.
    - "similarity" (cũ): sort theo (1-distance) + field_bonus, giữ để có thể
      rollback hoặc A/B test.
    """
    if not raw:
        return None

    scored = []
    for doc, distance in raw:
        meta = doc.metadata
        if (meta.get("title") == job.title
                and meta.get("company") == job.company
                and (job.title or job.company)):
            continue
        similarity = 1 - distance
        bonus = _field_bonus(job, meta)
        applied = int(meta.get("applied", 0) or 0)
        view = int(meta.get("view", 0) or 0)
        scored.append({
            "doc": doc,
            "distance": distance,
            "similarity": similarity,
            "bonus": bonus,
            "applied": applied,
            "view": view,
            "perf_score": applied + view * perf_view_weight,
            "composite": similarity + bonus,
        })

    if not scored:
        return None

    if strategy == "performance":
        pool = [s for s in scored if s["similarity"] >= min_similarity]
        if not pool:
            # Tất cả đều dưới ngưỡng → fallback lấy tất cả để vẫn có gợi ý
            pool = scored
        pool.sort(key=lambda s: s["perf_score"], reverse=True)
    else:
        scored.sort(key=lambda s: s["composite"], reverse=True)
        pool = scored

    if not pool:
        return None

    top = pool[0]
    candidates = [(s["doc"], s["distance"], s["composite"]) for s in pool]
    return top["doc"].metadata, top["distance"], candidates


def find_benchmark_job(db, job, k: int = SEARCH_K, *, strategy: str = "performance", **kwargs):
    """Tìm benchmark job trong Chroma và rank.

    Default strategy mới là "performance": trong nhóm job đủ tương đồng với
    job của HR (similarity >= min_similarity), pick job có applied + view cao
    nhất — tức job THÀNH CÔNG cùng loại. Trước đây code pick job GIỐNG NHẤT
    dù job đó cũng đang chết, khiến gap analysis vô nghĩa.

    Để rollback về logic cũ: truyền strategy="similarity".

    Trả về (top_meta, top_distance, candidates) hoặc None chỉ khi collection
    rỗng / không có job nào khác job hiện tại.
    """
    # QUAN TRỌNG: phải dùng cùng formatter với build_index, không thì query và
    # document nằm ở hai không gian vector khác nhau (English raw vs Vietnamese
    # labeled) và similarity gần như ngẫu nhiên.
    query = format_job_text(job.model_dump())

    cat = (getattr(job, "category", "") or "").strip()
    where_filter = {"category": cat} if cat else None

    results = db.similarity_search_with_score(query, k=k, filter=where_filter)
    raw = list(results)

    return _rank_candidates(raw, job, strategy=strategy, **kwargs)


def build_comparison(job, top_meta: dict) -> list[dict]:
    """So sánh job của HR với benchmark job theo từng field:
    applications, views, salary, location, benefit richness, employment type,
    work approach, experience level, description length.

    Verdict chỉ là gợi ý cho UI; prompt LLM đọc cả your_value/competitor_value
    nên vẫn có signal ngay cả khi verdict = "equal".
    """
    comparison = []

    # --- Applications (đã có) ---
    your_applied = job.applied or 0
    comp_applied = int(top_meta.get("applied", 0) or 0)
    comparison.append({
        "field": "Applications",
        "your_value": str(your_applied),
        "competitor_value": str(comp_applied),
        "verdict": "better" if your_applied > comp_applied
                   else "worse" if your_applied < comp_applied else "equal",
    })

    your_view = job.view or 0
    comp_view = int(top_meta.get("view", 0) or 0)
    comparison.append({
        "field": "Views",
        "your_value": str(your_view),
        "competitor_value": str(comp_view),
        "verdict": "better" if your_view > comp_view
                   else "worse" if your_view < comp_view else "equal",
    })

    your_salary_lo = job.min_salary or 0
    your_salary_hi = job.max_salary or 0
    comp_salary_lo = top_meta.get("min_salary", 0) or 0
    comp_salary_hi = top_meta.get("max_salary", 0) or 0
    your_salary_top = max(your_salary_lo, your_salary_hi)
    comp_salary_top = max(comp_salary_lo, comp_salary_hi)
    comparison.append({
        "field": "Salary range",
        "your_value": _fmt_salary(your_salary_lo, your_salary_hi),
        "competitor_value": _fmt_salary(comp_salary_lo, comp_salary_hi),
        "verdict": "better" if your_salary_top > comp_salary_top
                   else "worse" if your_salary_top < comp_salary_top else "equal",
    })

    # --- Location (ward + province, không còn dùng 'location' string) ---
    your_loc = _fmt_location(job.ward, job.province)
    comp_loc = _fmt_location(top_meta.get("ward", ""), top_meta.get("province", ""))
    your_key = _location_key(job.ward, job.province)
    comp_key = _location_key(top_meta.get("ward", ""), top_meta.get("province", ""))
    comparison.append({
        "field": "Location",
        "your_value": your_loc,
        "competitor_value": comp_loc,
        "verdict": "equal" if your_key and your_key == comp_key else "different",
    })

    # --- Employment type ---
    your_et = (job.employment_type or "").strip() or "Not available"
    comp_et = (top_meta.get("employment_type", "") or "").strip() or "Not available"
    comparison.append({
        "field": "Employment type",
        "your_value": your_et,
        "competitor_value": comp_et,
        "verdict": "equal" if your_et == comp_et else "different",
    })

    # --- Work approach (thay cho 'Work type' cũ) ---
    your_wa = (job.work_approach or "").strip() or "Not available"
    comp_wa = (top_meta.get("work_approach", "") or "").strip() or "Not available"
    comparison.append({
        "field": "Work approach",
        "your_value": your_wa,
        "competitor_value": comp_wa,
        "verdict": "equal" if your_wa == comp_wa else "different",
    })

    # --- Experience level (đã có) ---
    your_exp = (job.experience_level or "").strip() or "Not available"
    comp_exp = (top_meta.get("experience_level", "") or "").strip() or "Not available"
    comparison.append({
        "field": "Experience level",
        "your_value": your_exp,
        "competitor_value": comp_exp,
        "verdict": "equal" if your_exp == comp_exp else "different",
    })

    your_words = word_count(job.description)
    comp_words = top_meta.get("description_word_count")
    if comp_words is None:
        # fallback nếu DB cũ chưa được reindex với field mới
        comparison.append({
            "field": "Description length (words)",
            "your_value": str(your_words),
            "competitor_value": "No data",
            "verdict": "equal",
        })
    else:
        comparison.append({
            "field": "Description length (words)",
            "your_value": str(your_words),
            "competitor_value": str(int(comp_words)),
            "verdict": "better" if your_words > comp_words
                       else "worse" if your_words < comp_words else "equal",
        })


    your_benefit_words = word_count(job.benefit)
    comp_benefit_words = top_meta.get("benefit_word_count")
    if comp_benefit_words is None:
        comparison.append({
            "field": "Benefit richness (words)",
            "your_value": str(your_benefit_words),
            "competitor_value": "No data",
            "verdict": "equal",
        })
    else:
        comparison.append({
            "field": "Benefit richness (words)",
            "your_value": str(your_benefit_words),
            "competitor_value": str(int(comp_benefit_words)),
            "verdict": "better" if your_benefit_words > comp_benefit_words
                       else "worse" if your_benefit_words < comp_benefit_words else "equal",
        })

    return comparison


def _snapshot_from_job(job) -> dict:
    """Mục 1: ảnh chụp field của job đang phân tích (theo build index)."""
    return {
        "title": job.title or "",
        "company": job.company or "",
        "category": job.category or "",
        "employment_type": job.employment_type or "",
        "experience_level": job.experience_level or "",
        "work_approach": job.work_approach or "",
        "location": _fmt_location(job.ward, job.province),
        "salary": _fmt_salary(job.min_salary, job.max_salary),
        "applied": int(job.applied or 0),
        "view": int(job.view or 0),
    }


def _snapshot_from_meta(meta: dict) -> dict:
    """Mục 2: ảnh chụp field của job benchmark (theo build index / metadata)."""
    return {
        "title": meta.get("title", "") or "",
        "company": meta.get("company", "") or "",
        "category": meta.get("category", "") or "",
        "employment_type": meta.get("employment_type", "") or "",
        "experience_level": meta.get("experience_level", "") or "",
        "work_approach": meta.get("work_approach", "") or "",
        "location": _fmt_location(meta.get("ward", ""), meta.get("province", "")),
        "salary": _fmt_salary(meta.get("min_salary", 0), meta.get("max_salary", 0)),
        "applied": int(meta.get("applied", 0) or 0),
        "view": int(meta.get("view", 0) or 0),
    }


def _benchmark_reason(job, top_meta: dict, similarity_pct: int, group_size: int) -> str:
    cat = (top_meta.get("category", "") or "").strip()
    exp = (top_meta.get("experience_level", "") or "").strip()
    wa = (top_meta.get("work_approach", "") or "").strip()

    similar_parts = []
    if cat:
        similar_parts.append(f"cùng ngành {cat}")
    if exp and exp == (job.experience_level or "").strip():
        similar_parts.append(f"cùng cấp bậc {exp}")
    if wa and wa == (job.work_approach or "").strip():
        similar_parts.append(f"cùng hình thức làm việc {wa}")

    similar_text = ", ".join(similar_parts) if similar_parts else "nội dung tương đồng"

    return (
        f"Trong tin tuyển dụng {similar_text}, "
        f"đây là tin đang thu hút nhiều ứng viên nhất — "
        f"nên được chọn để so sánh với tin của bạn."
    )

def _parse_json_block(text: str) -> dict:
    """Bóc JSON từ output LLM, chịu được ```json fences và text thừa."""
    if not text:
        return {}
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?", "", cleaned).strip()
    cleaned = re.sub(r"```$", "", cleaned).strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Fallback: lấy object JSON đầu tiên trong chuỗi
        match = re.search(r"\{.*\}", cleaned, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except json.JSONDecodeError:
                return {}
        return {}


def _as_str_list(value) -> list[str]:
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    return []


def _generate_structured_sections(job, top_meta: dict) -> dict:
    """Mục 3-6: gọi LLM trả JSON gap/benefit/skills/recommendations.

    Cấp cho LLM TEXT THẬT của cả 2 job (benefit, requirement, description) để nó
    chỉ ra cụ thể job đang phân tích thiếu gì so với benchmark.
    """
    def block(title, benefit, requirement, description, applied, view, salary, loc, exp):
        return (
            f"[{title}]\n"
            f"Kinh nghiệm yêu cầu: {exp or '(không ghi)'}\n"
            f"Địa điểm: {loc or '(không ghi)'}\n"
            f"Mức lương: {salary or '(không ghi)'}\n"
            f"Lượt ứng tuyển: {applied} | Lượt xem: {view}\n"
            f"Yêu cầu / Skills: {requirement or '(trống)'}\n"
            f"Phúc lợi: {benefit or '(trống)'}\n"
            f"Mô tả: {description or '(trống)'}\n"
        )

    job_block = block(
        "JOB ĐANG PHÂN TÍCH",
        job.benefit, job.requirement, job.description,
        int(job.applied or 0), int(job.view or 0),
        _fmt_salary(job.min_salary, job.max_salary),
        _fmt_location(job.ward, job.province),
        job.experience_level,
    )
    bench_block = block(
        "JOB BENCHMARK (hiệu suất tốt nhất cùng nhóm)",
        top_meta.get("benefit", ""), top_meta.get("requirement", ""),
        top_meta.get("description", ""),
        int(top_meta.get("applied", 0) or 0), int(top_meta.get("view", 0) or 0),
        _fmt_salary(top_meta.get("min_salary", 0), top_meta.get("max_salary", 0)),
        _fmt_location(top_meta.get("ward", ""), top_meta.get("province", "")),
        top_meta.get("experience_level", ""),
    )

    prompt = (
        "Bạn là chuyên gia tuyển dụng. HR muốn hiểu vì sao tin tuyển dụng của họ "
        "ít lượt xem / lượt ứng tuyển, so với tin có hiệu suất tốt nhất trong nhóm "
        "tương đồng.\n\n"
        f"{job_block}\n{bench_block}\n"
        "Quy ước gọi tên: tin của HR là 'Job phân tích', tin so sánh là 'Job tương "
        "đồng'. "
        "'competitor'.\n\n"
        "Trả về DUY NHẤT một JSON hợp lệ (không markdown, không văn bản ngoài JSON) "
        "theo đúng dạng:\n"
        '{\n'
        '  "gap_analysis": ["..."],\n'
        '  "benefit_analysis": ["..."],\n'
        '  "skills_analysis": ["..."],\n'
        '  "recommendations": ["..."]\n'
        '}\n\n'
        "Quy tắc BẮT BUỘC:\n"
        "- Viết tiếng Việt, mỗi phần tử là 1 câu NGẮN (≤ 25 từ), cụ thể, bám vào "
        "số liệu / nội dung ở trên. Không nói chung chung.\n"
        "- TUYỆT ĐỐI KHÔNG dùng các cụm sáo rỗng: 'hãy cân nhắc', 'có thể xem xét', "
        "'nên cân nhắc', 'có lẽ'. Nói thẳng việc cần làm.\n"
        "- gap_analysis: với MỖI tiêu chí Job phân tích kém Job tương đồng, nêu "
        "chênh lệch cụ thể bằng giá trị thật + 1 hành động khắc phục cụ thể. "
        "Không suy luận nguyên nhân nếu dữ liệu không chứng minh được.\n"
        "- benefit_analysis: liệt kê phúc lợi Job tương đồng CÓ mà Job phân tích "
        "THIẾU + gợi ý bổ sung cụ thể. Nếu thiếu dữ liệu phúc lợi ở một trong hai "
        'bên, trả đúng một phần tử: "Không thể kết luận nếu thiếu dữ liệu phúc lợi."\n'
        "- skills_analysis: đánh giá skills trong Yêu cầu (quá cao cho cấp bậc, công "
        'nghệ cũ). Nếu thiếu dữ liệu: "Không thể kết luận nếu thiếu dữ liệu skills."\n'
        "- recommendations: ĐÚNG 2-3 việc CỤ THỂ cần làm ngay, sắp xếp theo mức độ "
        "ảnh hưởng (cao → thấp). Mỗi việc bắt đầu bằng động từ hành động.\n"
        "- Tổng output không quá 180 từ để còn chỗ cho phần render 5 mục ở frontend.\n"
    )
    try:
        raw = generate_advice(prompt, max_tokens=1500)
    except Exception:
        logger.exception(
            "LLM structured sections failed for job=%r (category=%r)",
            job.title, getattr(job, "category", ""),
        )
        return {
            "gap_analysis": [],
            "benefit_analysis": [],
            "skills_analysis": [],
            "recommendations": [
                "Không thể tạo phân tích chi tiết lúc này do dịch vụ AI tạm gián "
                "đoạn — nên thử lại sau."
            ],
        }
    data = _parse_json_block(raw)
    return {
        "gap_analysis": _as_str_list(data.get("gap_analysis")),
        "benefit_analysis": _as_str_list(data.get("benefit_analysis")),
        "skills_analysis": _as_str_list(data.get("skills_analysis")),
        "recommendations": _as_str_list(data.get("recommendations")),
    }


def _market_context(your_applied: int, avg_applied: float | None) -> str:
    """Section 1: 1 câu về vị trí Job phân tích so với trung bình nhóm.

    KHÔNG lặp lại số applied/view thật (UI đã hiển thị riêng) — chỉ nêu
    xu hướng + % chênh lệch.
    """
    if avg_applied is None or avg_applied <= 0:
        return "Chưa có đủ dữ liệu để so sánh với thị trường."
    ratio = your_applied / avg_applied
    if ratio < 0.7:
        pct = round((1 - ratio) * 100)
        return f"Job phân tích đang có lượng tương tác thấp hơn trung bình nhóm khoảng {pct}%."
    if ratio > 1.3:
        pct = round((ratio - 1) * 100)
        return f"Job phân tích đang có lượng tương tác cao hơn trung bình nhóm khoảng {pct}%."
    return "Job phân tích đang có lượng tương tác ngang với trung bình nhóm."


def _structured_to_text(
    structured: dict,
    *,
    your_applied: int,
    avg_applied: float | None,
) -> str:
    """Render `advice` text theo spec HR — đúng 5 mục, tiếng Việt, ≤200 từ.

    Quy tắc ngôn ngữ (theo yêu cầu HR):
    - Gọi tin đang phân tích = "Job phân tích"
    - Gọi tin so sánh = "Job tương đồng"
    - KHÔNG dùng: "benchmark", "similarity score", "vector", "embedding",
      "Job A", "Job B", "your posting", "competitor"
    - KHÔNG lặp số applied/view (UI hiển thị riêng)
    - Không câu sáo rỗng ("hãy cân nhắc", "có thể xem xét") — nói thẳng việc cần làm
    - Không markdown header (##), chỉ danh sách đánh số (1., 2., ...)

    Sections:
    1. Bối cảnh thị trường — 1 câu (your_applied vs avg_applied)
    2. Giới thiệu Job tương đồng — 1 câu (tên + lý do chọn)
    3. Phân tích khoảng cách — từ gap_analysis (LLM)
    4. Phúc lợi thiếu — từ benefit_analysis (LLM)
    5. Khuyến nghị ưu tiên — từ recommendations, tối đa 3 items (LLM)

    `skills_analysis` không được render vào advice (giữ trong structured dict
    cho UI tự dùng nếu cần).
    """
    bm = structured["job_tuong_dong"]
    lines = []

    lines.append(f"1. {_market_context(your_applied, avg_applied)}")

    category = (bm.get("category") or "").strip()
    level = (bm.get("experience_level") or "").strip()
    parts = [f"cùng ngành {category}"] if category else []
    if level:
        parts.append(f"cùng cấp bậc {level}")
    parts.append("có lượng tương tác cao nhất nhóm")
    reasons = ", ".join(parts)
    company = (bm.get("company") or "").strip()
    location = f" ({bm.get('location')})" if bm.get("location") else ""
    lines.append(
        f"2. Job tương đồng là \"{bm['title']}\""
        f"{' tại ' + company if company else ''}{location} — {reasons}."
    )

    gaps = structured.get("gap_analysis") or []
    lines.append("3. Khoảng cách cần cải thiện:")
    if gaps:
        lines.extend(f"   - {g}" for g in gaps)
    else:
        lines.append("   - Không phát hiện khoảng cách rõ ràng từ dữ liệu.")

    benefits = structured.get("benefit_analysis") or []
    lines.append("4. Phúc lợi Job tương đồng đang có mà Job phân tích chưa có:")
    if benefits:
        lines.extend(f"   - {b}" for b in benefits)
    else:
        lines.append("   - Không có dữ liệu để so sánh.")

    recs = structured.get("recommendations") or []
    lines.append("5. Khuyến nghị ưu tiên:")
    if recs:
        lines.extend(f"   - {r}" for r in recs[:3])
    else:
        lines.append("   - Chưa có khuyến nghị cụ thể.")

    text = "\n".join(lines)

    words = text.split()
    if len(words) > 200:
        truncated_words = words[:200]
        text = " ".join(truncated_words) + " …"
    return text


def analyze_market(job) -> dict:
    db = get_db()

    benchmark = find_benchmark_job(db, job)

    if benchmark is None:
        return {
            "your_applied": job.applied,
            "your_view": job.view,
            "avg_applied": None,
            "top_similar_applied": None,
            "competitor_title": None,
            "competitor_similarity_score": None,
            "comparison": [],
            "structured": None,
        }

    top_meta, top_distance, candidates = benchmark
    top_applied = int(top_meta.get("applied", 0) or 0)
    applied_list = [int(c[0].metadata.get("applied", 0) or 0) for c in candidates]
    avg_applied = mean(applied_list) if applied_list else 0
    comparison = build_comparison(job, top_meta)
    similarity_pct = round((1 - top_distance) * 100)
    sections = _generate_structured_sections(job, top_meta)
    structured = {
        "job_analyzing": _snapshot_from_job(job),
        "job_tuong_dong": _snapshot_from_meta(top_meta),
        "ly_do_chon": _benchmark_reason(job, top_meta, similarity_pct, len(candidates)),
        **sections,
    }


    return {
        "your_applied": job.applied,
        "your_view": job.view,
        "avg_applied": round(avg_applied, 1),
        "top_similar_applied": top_applied,
        "competitor_title": top_meta.get("title", ""),
        "competitor_similarity_score": round(1 - top_distance, 3),
        "comparison": comparison,
        "structured": structured,
    }
