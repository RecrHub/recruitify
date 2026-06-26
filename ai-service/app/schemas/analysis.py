from pydantic import BaseModel

class JobRequest(BaseModel):
    title: str
    description: str
    skills: str = ""
    applied: int = 0

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
