from statistics import mean
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from app.config import CHROMA_DIR, EMBED_MODEL
from app.llm.client import generate_advice

# Chroma trả về cosine DISTANCE (càng nhỏ càng giống), không phải similarity.
# Không dùng để LOẠI kết quả — chỉ dùng để RANK và để trả competitor_similarity_score
# cho frontend hiển thị mức độ tin cậy. Luôn trả về candidate tốt nhất tìm được.
SEARCH_K = 15


def get_db():
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBED_MODEL
    )
    return Chroma(
        collection_name="jobs_market",
        embedding_function=embeddings,
        persist_directory=CHROMA_DIR
    )


def _fmt_salary(lo, hi) -> str:
    lo = lo or 0
    hi = hi or 0
    if not lo and not hi:
        return "Not available"
    if lo and hi:
        return f"{lo:,.0f} - {hi:,.0f}"
    return f"{(lo or hi):,.0f}"


def _bool_str(v) -> str:
    return "Yes" if v else "No"


def _benefits_str(remote, work_type) -> str:
    parts = []
    if remote:
        parts.append("Remote")
    wt = (work_type or "").strip()
    if wt:
        parts.append(wt)
    return ", ".join(parts) if parts else "Not available"


def _benefits_score(remote, work_type) -> int:
    score = 0
    if remote:
        score += 1
    if (work_type or "").strip():
        score += 1
    return score


def _location_key(loc: str) -> str:
    """Chuẩn hóa location để so khớp lỏng, ví dụ 'Ho Chi Minh City, Vietnam' -> 'ho chi minh city'."""
    if not loc:
        return ""
    return loc.strip().lower().split(",")[0]


def _field_bonus(job, meta: dict) -> float:
    """Điểm thưởng cho các field cấu trúc khớp nhau, cộng vào điểm rank cuối cùng
    bên cạnh điểm semantic similarity từ title/skills/description.
    Location được ưu tiên cao nhất vì ta muốn benchmark cùng khu vực."""
    bonus = 0.0
    if _location_key(job.location) and _location_key(job.location) == _location_key(meta.get("location", "")):
        bonus += 0.25
    if job.experience_level and job.experience_level == meta.get("experience_level"):
        bonus += 0.10
    if job.work_type and job.work_type == meta.get("work_type"):
        bonus += 0.05
    if bool(job.remote_allowed) == bool(meta.get("remote_allowed")):
        bonus += 0.05
    return bonus


def find_benchmark_job(db, job, k: int = SEARCH_K):
    """Tìm job benchmark: ưu tiên giống về nội dung (title + skills + description) và
    cộng thêm điểm cho job có location / experience_level / work_type /
    remote_allowed khớp — nhưng KHÔNG loại job nào chỉ vì độ giống thấp.
    Luôn trả về candidate tốt nhất trong k kết quả tìm được (nếu có ít nhất
    một job khác trong hệ thống).

    Trả về (top_meta, top_distance, candidates) hoặc None chỉ khi collection
    rỗng / không có job nào khác job hiện tại.
    """
    # Nhân đôi title để tăng trọng số của title so với description trong embedding,
    # vì description hai job khác ngành (vd Backend vs DevOps) thường trùng nhiều từ khóa hạ tầng.
    # Thêm skills để so khớp theo kỹ năng — khớp đúng format lúc build index
    # ("title. description. Skills: ...") nên vector query cùng không gian với vector đã lưu.
    skills = (getattr(job, "skills", "") or "").strip()
    query = f"{job.title}. {job.title}. Skills: {skills}. {job.description}"

    where_filter = None
    if getattr(job, "category", None):
        where_filter = {"category": job.category}

    results = db.similarity_search_with_score(query, k=k, filter=where_filter)

    candidates = []
    self_id = getattr(job, "id", None)
    for doc, distance in results:
        meta = doc.metadata
        # Chỉ loại chính job hiện tại khi thật sự có id trùng nhau,
        # tránh trường hợp cả hai đều None (None == None) làm bỏ hết candidate.
        if self_id is not None and meta.get("job_id") == self_id:
            continue
        composite_score = (1 - distance) + _field_bonus(job, meta)
        candidates.append((doc, distance, composite_score))

    if not candidates:
        return None

    candidates.sort(key=lambda c: c[2], reverse=True)
    top_doc, top_distance, _ = candidates[0]
    return top_doc.metadata, top_distance, candidates


def build_comparison(job, top_meta: dict) -> list[dict]:
    """Directly compare your job (A) against the benchmark job (B)
    across salary, location, benefits, and other criteria."""
    comparison = []

    your_applied = job.applied or 0
    comp_applied = int(top_meta.get("applied", 0) or 0)
    comparison.append({
        "field": "Applications",
        "your_value": str(your_applied),
        "competitor_value": str(comp_applied),
        "verdict": "better" if your_applied > comp_applied
                   else "worse" if your_applied < comp_applied else "equal",
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

    your_loc = (job.location or "Not available").strip()
    comp_loc = (top_meta.get("location") or "Not available").strip()
    comparison.append({
        "field": "Location",
        "your_value": your_loc,
        "competitor_value": comp_loc,
        "verdict": "equal" if _location_key(your_loc) == _location_key(comp_loc) else "different",
    })

    your_remote = bool(job.remote_allowed)
    comp_remote = bool(top_meta.get("remote_allowed"))
    your_benefits = _benefits_score(your_remote, job.work_type)
    comp_benefits = _benefits_score(comp_remote, top_meta.get("work_type"))
    comparison.append({
        "field": "Benefits",
        "your_value": _benefits_str(your_remote, job.work_type),
        "competitor_value": _benefits_str(comp_remote, top_meta.get("work_type")),
        "verdict": "better" if your_benefits > comp_benefits
                   else "worse" if your_benefits < comp_benefits else "equal",
    })

    your_wt = (job.work_type or "Not available").strip()
    comp_wt = (top_meta.get("work_type") or "Not available").strip()
    comparison.append({
        "field": "Work type",
        "your_value": your_wt,
        "competitor_value": comp_wt,
        "verdict": "equal" if your_wt == comp_wt else "different",
    })

    comparison.append({
        "field": "Remote allowed",
        "your_value": _bool_str(your_remote),
        "competitor_value": _bool_str(comp_remote),
        "verdict": "better" if your_remote and not comp_remote
                   else "worse" if comp_remote and not your_remote else "equal",
    })

    your_exp = (job.experience_level or "Not available").strip()
    comp_exp = (top_meta.get("experience_level") or "Not available").strip()
    comparison.append({
        "field": "Experience level",
        "your_value": your_exp,
        "competitor_value": comp_exp,
        "verdict": "equal" if your_exp == comp_exp else "different",
    })

    your_words = len(job.description.split())
    comp_words = top_meta.get("description_word_count")
    comparison.append({
        "field": "Description length (words)",
        "your_value": str(your_words),
        "competitor_value": str(comp_words) if comp_words is not None else "No data",
        "verdict": "equal" if comp_words is None
                   else "better" if your_words > comp_words
                   else "worse" if your_words < comp_words else "equal",
    })

    return comparison


def analyze_market(job) -> dict:
    db = get_db()

    benchmark = find_benchmark_job(db, job)

    if benchmark is None:
        # Chỉ rơi vào đây khi collection rỗng hoặc chỉ có đúng job hiện tại trong DB.
        return {
            "your_applied": job.applied,
            "avg_applied": None,
            "top_similar_applied": None,
            "competitor_title": None,
            "competitor_similarity_score": None,
            "comparison": [],
            "advice": "Chưa có tin nào khác trong hệ thống để so sánh.",
        }

    top_meta, top_distance, candidates = benchmark
    top_applied = int(top_meta.get("applied", 0) or 0)

    # avg_applied tính trên toàn bộ k candidates tìm được (không còn lọc theo
    # ngưỡng similarity — xem ghi chú SEARCH_K ở đầu file).
    applied_list = [c[0].metadata.get("applied", 0) for c in candidates]
    avg_applied = mean(applied_list) if applied_list else 0

    comparison = build_comparison(job, top_meta)

    # Bảng so sánh chi tiết từng field kèm GIÁ TRỊ THẬT của A và B,
    # để LLM đưa lời khuyên bám vào chênh lệch cụ thể thay vì nói chung chung.
    comparison_lines = "\n".join(
        f"  - {c['field']}: yours = {c['your_value']} | benchmark = {c['competitor_value']} "
        f"(yours is {c['verdict']})"
        for c in comparison
    )

    # Chỉ liệt kê TÊN field yếu hơn ở đây — giá trị cụ thể đã có trong comparison_lines,
    # lặp lại giá trị ở cả hai chỗ chỉ làm prompt dài mà không thêm thông tin.
    weaker_fields = [c["field"] for c in comparison if c["verdict"] == "worse"]
    weaker_text = ", ".join(weaker_fields) if weaker_fields else "no clearly weaker points"

    similarity_pct = round((1 - top_distance) * 100)
    low_similarity_note = (
        " Note: similarity is fairly low, so mention this benchmark is only "
        "the closest match available, not a near-identical role."
        if similarity_pct < 50 else ""
    )

    your_title = job.title
    bench_title = top_meta.get("title") or "the benchmark posting"

    advice = generate_advice(
        f"You are advising an employer on their job posting performance.\n\n"
        f"Your posting: '{your_title}', {job.applied} applications.\n"
        f"Benchmark posting (closest match by title/skills/location, and the "
        f"top performer among similar postings): '{bench_title}', {top_applied} applications.\n"
        f"Similarity between the two: {similarity_pct}%.{low_similarity_note}\n"
        f"Group average across the {len(candidates)} closest matches: {avg_applied:.0f} applications.\n\n"
        f"Field-by-field comparison (actual values, 'yours' vs 'benchmark'):\n{comparison_lines}\n\n"
        f"Your posting is concretely worse than the benchmark on: {weaker_text}.\n\n"
        f"Structure your answer in exactly 3 short parts, in this order:\n"
        f"1. Market context — one sentence placing your posting's applicant count "
        f"relative to the group average (above/below/in line with the market).\n"
        f"2. The benchmark — one sentence naming the benchmark posting as the top "
        f"performer among similar postings and its application count.\n"
        f"3. Gap analysis — for EACH field where your posting is worse, state what "
        f"it is missing compared to the benchmark using the real values above "
        f"(e.g. 'the benchmark offers remote work and a higher salary, yours does "
        f"not'), then give one concrete fix per gap. If your posting already beats "
        f"the benchmark on every field, say so in part 3 instead and suggest how "
        f"to keep the edge.\n\n"
        f"IMPORTANT: never use the generic labels 'Job A' or 'Job B' — always refer "
        f"to postings either by their real title (\"{your_title}\" / \"{bench_title}\") "
        f"or as \"your posting\" / \"the benchmark posting\". "
        f"Do NOT restate the raw application counts, group average, or similarity "
        f"percentage beyond what part 1 and 2 require — the UI already displays "
        f"those numbers separately. Only reference the actual differences shown "
        f"above, no generic marketing advice. "
        f"Keep the entire response under 130 words, no markdown headers, plain "
        f"short paragraphs or a short numbered list for part 3."
    )

    return {
        "your_applied": job.applied,
        "avg_applied": round(avg_applied, 1),
        "top_similar_applied": top_applied,
        "competitor_title": top_meta.get("title", ""),
        "competitor_similarity_score": round(1 - top_distance, 3),
        "comparison": comparison,
        "advice": advice,
    }