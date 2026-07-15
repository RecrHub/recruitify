"""Shared formatters between build_index.py (document side) and
market.py (query side). Keeping them in lock-step is what makes
the similarity search work — both sides must project into the same
vector space, otherwise the query and the stored documents live in
different embeddings and the benchmark is essentially random.
"""

from math import isnan
from typing import Any


def _safe_str(val: Any) -> str:
    """Normalize any value into a trimmed string. None / NaN / empty -> ''."""
    if val is None:
        return ""
    try:
        if isinstance(val, float) and isnan(val):
            return ""
    except TypeError:
        pass
    return str(val).strip()


def _line(label: str, value: str) -> str:
    return f"{label}: {value}" if value else ""


def format_job_text(data: dict) -> str:
    """Render a job as a labeled multi-line string used for both
    indexing (Chroma documents) and querying (market analyzer).

    Accepts a dict with these canonical keys (matches jobs_clean.csv):
        title, company, category, description, requirement,
        responsibilities, benefit, employment_type, experience_level,
        work_approach, ward, province, min_salary, max_salary,
        applied, view

    Returns an empty string if every field is empty (caller should
    skip such rows instead of indexing a blank document).
    """
    min_s = _safe_str(data.get("min_salary"))
    max_s = _safe_str(data.get("max_salary"))
    salary = ""
    if min_s or max_s:
        salary = f"{min_s or '?'} - {max_s or '?'}"

    location = ", ".join(
        filter(None, [_safe_str(data.get("ward")), _safe_str(data.get("province"))])
    )

    parts = [
        _line("Tiêu đề", _safe_str(data.get("title"))),
        _line("Công ty", _safe_str(data.get("company"))),
        _line("Danh mục", _safe_str(data.get("category"))),
        _line("Mô tả", _safe_str(data.get("description"))),
        _line("Yêu cầu", _safe_str(data.get("requirement"))),
        _line("Trách nhiệm", _safe_str(data.get("responsibilities"))),
        _line("Phúc lợi", _safe_str(data.get("benefit"))),
        _line("Hình thức làm việc", _safe_str(data.get("employment_type"))),
        _line("Kinh nghiệm", _safe_str(data.get("experience_level"))),
        _line("Mô hình làm việc", _safe_str(data.get("work_approach"))),
        _line("Địa điểm", location),
        _line("Mức lương", salary),
        _line("Lượt ứng tuyển", _safe_str(data.get("applied"))),
        _line("Lượt xem", _safe_str(data.get("view"))),
    ]
    return "\n".join(p for p in parts if p)


def _location_key(ward: str, province: str) -> str:
    """Combine ward + province into a comparable key.
    Two jobs are 'same location' if both halves match (case-insensitive).
    """
    w = _safe_str(ward).lower()
    p = _safe_str(province).lower()
    return f"{w}|{p}" if (w or p) else ""


def word_count(text: str) -> int:
    if not text:
        return 0
    return len(text.split())
