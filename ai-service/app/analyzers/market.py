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

def analyze_market(job) -> dict:
    db = get_db()
    query = f"{job.title}. {job.description}"

    similar = db.similarity_search(query, k=10)

    applied_list = [s.metadata.get("applied", 0) for s in similar]
    avg_applied = mean(applied_list) if applied_list else 0
    top = max(similar, key=lambda s: s.metadata.get("applied", 0))
    top_applied = top.metadata.get("applied", 0)

    advice = generate_advice(
        f"Job '{job.title}' có {job.applied} lượt ứng tuyển. "
        f"Job tương tự hút nhất có {top_applied} lượt, tên '{top.metadata['title']}'. "
        f"Trung bình nhóm: {avg_applied:.0f}. "
        f"Hãy đưa 2-3 gợi ý ngắn giúp job này thu hút ứng viên hơn."
    )

    return {
        "your_applied": job.applied,
        "avg_applied": round(avg_applied, 1),
        "top_similar_applied": top_applied,
        "advice": advice,
    }
