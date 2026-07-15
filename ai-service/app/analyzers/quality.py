"""Quality checks cho 1 job posting.

Kiểm tra các field HR thường hay bỏ sót trên recruitify:
- Thiếu requirement / responsibilities / benefit (3 phần HR hay để trống)
- Mô tả quá ngắn (ứng viên không đủ thông tin để apply)
- Không có thông tin lương (số 1 lý do ứng viên lướt qua)
"""


def analyze_quality(job) -> dict:
    has_salary_field = bool(job.min_salary or job.max_salary)
    description_text = (job.description or "").lower()
    has_salary_text = any(
        k in description_text for k in ["salary", "lương", "$", "usd", "vnd", "triệu"]
    )

    checks = {
        "has_title": bool(job.title and job.title.strip()),
        "has_requirement": bool(job.requirement and job.requirement.strip()),
        "has_responsibilities": bool(job.responsibilities and job.responsibilities.strip()),
        "has_benefit": bool(job.benefit and job.benefit.strip()),
        "description_long_enough": len((job.description or "").split()) >= 50,
        "has_salary": has_salary_field or has_salary_text,
    }

    score = int(sum(1 for v in checks.values() if v) / len(checks) * 100)

    suggestions = []
    if not checks["has_requirement"]:
        suggestions.append("Add required skills and qualifications")
    if not checks["has_responsibilities"]:
        suggestions.append("List day-to-day responsibilities")
    if not checks["has_benefit"]:
        suggestions.append("Describe benefits and perks to attract candidates")
    if not checks["description_long_enough"]:
        suggestions.append("Description is too short — add more detail (aim for 50+ words)")
    if not checks["has_salary"]:
        suggestions.append("Add a salary range (either as a separate field or in the description)")

    return {"overall": score, "checks": checks, "suggestions": suggestions}
