from statistics import mean
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from app.config import CHROMA_DIR, EMBED_MODEL
from app.llm.client import generate_advice


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
        return "Không có thông tin"
    if lo and hi:
        return f"{lo:,.0f} - {hi:,.0f}"
    return f"{(lo or hi):,.0f}"


def _bool_str(v) -> str:
    return "Có" if v else "Không"


def _benefits_str(remote, work_type) -> str:
    parts = []
    if remote:
        parts.append("Remote")
    wt = (work_type or "").strip()
    if wt:
        parts.append(wt)
    return ", ".join(parts) if parts else "Không có thông tin"


def _benefits_score(remote, work_type) -> int:
    score = 0
    if remote:
        score += 1
    if (work_type or "").strip():
        score += 1
    return score


def build_comparison(job, top_meta: dict) -> list[dict]:
    """So sánh trực tiếp job của bạn (A) với job hút ứng viên nhất (B)
    về lương, location, phúc lợi và các tiêu chí khác."""
    comparison = []

    your_applied = job.applied or 0
    comp_applied = int(top_meta.get("applied", 0) or 0)
    comparison.append({
        "field": "Lượt ứng tuyển",
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
        "field": "Mức lương",
        "your_value": _fmt_salary(your_salary_lo, your_salary_hi),
        "competitor_value": _fmt_salary(comp_salary_lo, comp_salary_hi),
        "verdict": "better" if your_salary_top > comp_salary_top
                   else "worse" if your_salary_top < comp_salary_top else "equal",
    })

    your_loc = (job.location or "Không có thông tin").strip()
    comp_loc = (top_meta.get("location") or "Không có thông tin").strip()
    comparison.append({
        "field": "Location",
        "your_value": your_loc,
        "competitor_value": comp_loc,
        "verdict": "equal",
    })

    your_remote = bool(job.remote_allowed)
    comp_remote = bool(top_meta.get("remote_allowed"))
    your_benefits = _benefits_score(your_remote, job.work_type)
    comp_benefits = _benefits_score(comp_remote, top_meta.get("work_type"))
    comparison.append({
        "field": "Phúc lợi",
        "your_value": _benefits_str(your_remote, job.work_type),
        "competitor_value": _benefits_str(comp_remote, top_meta.get("work_type")),
        "verdict": "better" if your_benefits > comp_benefits
                   else "worse" if your_benefits < comp_benefits else "equal",
    })

    your_wt = (job.work_type or "Không có thông tin").strip()
    comp_wt = (top_meta.get("work_type") or "Không có thông tin").strip()
    comparison.append({
        "field": "Hình thức làm việc",
        "your_value": your_wt,
        "competitor_value": comp_wt,
        "verdict": "equal",
    })

    comparison.append({
        "field": "Cho phép remote",
        "your_value": _bool_str(your_remote),
        "competitor_value": _bool_str(comp_remote),
        "verdict": "better" if your_remote and not comp_remote
                   else "worse" if comp_remote and not your_remote else "equal",
    })

    your_exp = (job.experience_level or "Không có thông tin").strip()
    comp_exp = (top_meta.get("experience_level") or "Không có thông tin").strip()
    comparison.append({
        "field": "Cấp độ kinh nghiệm",
        "your_value": your_exp,
        "competitor_value": comp_exp,
        "verdict": "equal",
    })

    your_words = len(job.description.split())
    comparison.append({
        "field": "Độ dài mô tả (số từ)",
        "your_value": str(your_words),
        "competitor_value": "Không có dữ liệu",
        "verdict": "equal",
    })

    return comparison


def analyze_market(job) -> dict:
    db = get_db()
    query = f"{job.title}. {job.description}"

    similar = db.similarity_search(query, k=10)

    applied_list = [s.metadata.get("applied", 0) for s in similar]
    avg_applied = mean(applied_list) if applied_list else 0
    top = max(similar, key=lambda s: s.metadata.get("applied", 0))
    top_meta = top.metadata
    top_applied = top_meta.get("applied", 0)

    comparison = build_comparison(job, top_meta)

    weaker = [c["field"] for c in comparison if c["verdict"] == "worse"]
    weaker_text = ", ".join(weaker) if weaker else "không có điểm nào thua rõ rệt"

    advice = generate_advice(
        f"So sánh hai tin tuyển dụng:\n"
        f"- Job A (của bạn): '{job.title}', {job.applied} lượt ứng tuyển.\n"
        f"- Job B (hút nhất, tương tự): '{top_meta.get('title')}', "
        f"{top_applied} lượt ứng tuyển.\n"
        f"Trung bình nhóm: {avg_applied:.0f} lượt.\n"
        f"Job A đang thua Job B ở các tiêu chí: {weaker_text}.\n"
        f"Dựa vào đó, hãy đưa 2-3 gợi ý ngắn, cụ thể giúp Job A "
        f"thu hút ứng viên tốt hơn Job B."
    )

    return {
        "your_applied": job.applied,
        "avg_applied": round(avg_applied, 1),
        "top_similar_applied": top_applied,
        "competitor_title": top_meta.get("title", ""),
        "comparison": comparison,
        "advice": advice,
    }
