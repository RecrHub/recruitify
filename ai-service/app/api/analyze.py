from fastapi import APIRouter
from app.schemas.analysis import JobRequest, AnalysisResponse
from app.analyzers.quality import analyze_quality
from app.analyzers.market import analyze_market

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
def analyze(job: JobRequest):
    return {
        "quality": analyze_quality(job),
        "market": analyze_market(job),
}
