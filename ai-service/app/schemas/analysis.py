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

class MarketResult(BaseModel):
    your_applied: int
    avg_applied: float
    top_similar_applied: int
    advice: str

class AnalysisResponse(BaseModel):
    quality: QualityResult
    market: MarketResult
