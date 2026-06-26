def analyze_quality(job) -> dict:
    checks = {
        "has_title": len(job.title.strip()) > 0,
        "has_skills": len(job.skills.strip()) > 0,
        "description_long_enough": len(job.description.split()) >= 50,
        "has_salary": any(k in job.description.lower()
                          for k in ["salary", "lương", "$", "usd"]),
    }
    score = int(sum(checks.values()) / len(checks) * 100)

    suggestions = []
    if not checks["has_salary"]:
        suggestions.append("Nên thêm thông tin lương cụ thể")
    if not checks["description_long_enough"]:
        suggestions.append("Mô tả quá ngắn, nên chi tiết hơn")
    if not checks["has_skills"]:
        suggestions.append("Nên liệt kê kỹ năng yêu cầu")

    return {"overall": score, "checks": checks, "suggestions": suggestions}
