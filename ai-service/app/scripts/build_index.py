import pandas as pd
from pathlib import Path
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from app.config import CHROMA_DIR, EMBED_MODEL
from app.formatters import format_job_text, word_count

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "processed" / "jobs_clean.csv"

df = pd.read_csv(DATA_PATH)

embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)

texts = df.apply(lambda row: format_job_text(row.to_dict()), axis=1).tolist()

# Pre-compute word counts cho analyzer so sánh độ dài từng field mà không cần
# tái split text đã embed (vốn đã được format lại, không còn word boundary rõ).
df_meta = df.copy()
df_meta["description_word_count"] = df["description"].fillna("").apply(word_count)
df_meta["benefit_word_count"] = df["benefit"].fillna("").apply(word_count)

metadatas = df_meta[[
    "title",
    "company",
    "category",
    "employment_type",
    "experience_level",
    "work_approach",
    "ward",
    "province",
    "min_salary",
    "max_salary",
    "applied",
    "view",
    "description_word_count",
    "benefit_word_count",
    # Text thật của các field — cần cho phân tích Phúc lợi (mục 4) và Skills
    # (mục 5): analyzer phải biết benchmark job LIỆT KÊ những gì thì mới chỉ ra
    # được job đang phân tích THIẾU gì. Word count không đủ cho việc này.
    "benefit",
    "requirement",
    "description",
    "responsibilities",
]].fillna({
    "title": "",
    "company": "",
    "category": "",
    "employment_type": "",
    "experience_level": "",
    "work_approach": "",
    "ward": "",
    "province": "",
    "min_salary": 0,
    "max_salary": 0,
    "applied": 0,
    "view": 0,
    "description_word_count": 0,
    "benefit_word_count": 0,
    "benefit": "",
    "requirement": "",
    "description": "",
    "responsibilities": "",
}).to_dict("records")

# Xoá collection cũ trước khi nạp lại để tránh nhân đôi document mỗi lần chạy
# (add_texts luôn APPEND). Idempotent: chạy lại build_index bao nhiêu lần cũng ra
# đúng một bản dữ liệu.
db = Chroma(collection_name="jobs_market",
            embedding_function=embeddings,
            persist_directory=CHROMA_DIR)
try:
    db.delete_collection()
except Exception:
    pass
db = Chroma(collection_name="jobs_market",
            embedding_function=embeddings,
            persist_directory=CHROMA_DIR)
db.add_texts(texts=texts, metadatas=metadatas)

print(f"Da nap {len(texts)} job vao Chroma")
