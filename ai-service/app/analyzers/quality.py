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
        suggestions.append("Consider adding specific salary information")
    if not checks["description_long_enough"]:
        suggestions.append("Description is too short, consider adding more detail")
    if not checks["has_skills"]:
        suggestions.append("Consider listing required skills")

    return {"overall": score, "checks": checks, "suggestions": suggestions}
