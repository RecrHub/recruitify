from pydantic import BaseModel
from typing import Optional


class JobRequest(BaseModel):
    title: str
    description: str
    skills: str = ""
    applied: int = 0
    min_salary: Optional[float] = None
    max_salary: Optional[float] = None
    work_type: Optional[str] = None
    remote_allowed: Optional[bool] = None
    experience_level: Optional[str] = None
    company_name: Optional[str] = None
    location: Optional[str] = None


class QualityResult(BaseModel):
    overall: int
    checks: dict
    suggestions: list[str]


class ComparisonField(BaseModel):
    field: str
    your_value: str
    competitor_value: str
    verdict: str  # "better" | "worse" | "equal"


class MarketAnalysis(BaseModel):
    your_applied: int
    avg_applied: Optional[float] = None
    top_similar_applied: Optional[int] = None
    competitor_title: Optional[str] = None
    competitor_similarity_score: Optional[float] = None
    comparison: list[ComparisonField] = []
    advice: str


class AnalysisResponse(BaseModel):
    quality: QualityResult
    market: MarketAnalysis