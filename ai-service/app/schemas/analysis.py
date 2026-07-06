from pydantic import BaseModel
from typing import Optional


# Canonical job schema — khớp 1:1 với jobs_clean.csv (xem app/scripts/clean_data.py).
# Field nào thiếu trong payload sẽ default rỗng / 0 / None để analyzer không crash.
class JobRequest(BaseModel):
    title: str
    description: str
    requirement: str = ""
    responsibilities: str = ""
    benefit: str = ""

    company: str = ""
    category: str = ""
    employment_type: str = ""
    experience_level: str = ""

    work_approach: str = ""
    ward: str = ""
    province: str = ""

    min_salary: Optional[float] = None
    max_salary: Optional[float] = None
    applied: int = 0
    view: int = 0


class QualityResult(BaseModel):
    overall: int
    checks: dict
    suggestions: list[str]


class ComparisonField(BaseModel):
    field: str
    your_value: str
    competitor_value: str
    verdict: str 


class JobSnapshot(BaseModel):
    """Ảnh chụp các field (theo build index) của 1 job — dùng cho mục 1 và 2
    của output cấu trúc. Không cần LLM, lấy thẳng từ dữ liệu."""
    title: str = ""
    company: str = ""
    category: str = ""
    employment_type: str = ""
    experience_level: str = ""
    work_approach: str = ""
    location: str = ""
    salary: str = ""
    applied: int = 0
    view: int = 0


class StructuredAdvice(BaseModel):
    """Output market analysis theo 6 mục cố định.

    Key dùng tiếng Việt để khớp với output thật của `analyzers/market.py`
    (job_tuong_dong = job benchmark, ly_do_chon = vì sao chọn job này).

    - job_analyzing / job_tuong_dong: dữ liệu thuần (mục 1, 2)
    - ly_do_chon: vì sao chọn job này làm đối chiếu (mục 2)
    - gap_analysis: chỉ khác biệt CÓ trong dữ liệu, không suy luận nguyên nhân (mục 3)
    - benefit_analysis: phúc lợi benchmark có mà job đang phân tích thiếu (mục 4)
    - skills_analysis: đánh giá skills yêu cầu (mục 5)
    - recommendations: gợi ý cải thiện, giả thuyết phải có từ hedging (mục 6)
    """
    job_analyzing: JobSnapshot
    job_tuong_dong: JobSnapshot
    ly_do_chon: str = ""
    gap_analysis: list[str] = []
    benefit_analysis: list[str] = []
    skills_analysis: list[str] = []
    recommendations: list[str] = []


class MarketAnalysis(BaseModel):
    your_applied: int
    your_view: int
    avg_applied: Optional[float] = None
    top_similar_applied: Optional[int] = None
    competitor_title: Optional[str] = None
    competitor_similarity_score: Optional[float] = None
    comparison: list[ComparisonField] = []
    structured: Optional[StructuredAdvice] = None


class AnalysisResponse(BaseModel):
    quality: QualityResult
    market: MarketAnalysis
