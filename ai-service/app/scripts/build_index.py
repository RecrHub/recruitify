from xmlrpc import client

import pandas as pd
from pathlib import Path
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from app.config import CHROMA_DIR, EMBED_MODEL

BASE_DIR = Path(__file__).resolve().parent.parent 
DATA_PATH = BASE_DIR / "data" / "processed" / "jobs_clean.csv"

df = pd.read_csv(DATA_PATH)
embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
texts = (df["title"] + ". " + df["description"]
         + ". Skills: " + df["skills"].fillna("")).tolist()

metadatas = df[[
    "title", "applies",
    "min_salary", "max_salary",
    "location", "formatted_work_type",
    "remote_allowed", "formatted_experience_level",
    "company_name"
]].rename(columns={
    "applies": "applied",
    "formatted_work_type": "work_type",
    "formatted_experience_level": "experience_level"
}).fillna({
    "min_salary": 0,
    "max_salary": 0,
    "location": "",
    "work_type": "",
    "experience_level": "",
    "company_name": "",
    "remote_allowed": False,
}).to_dict("records")

db = Chroma(collection_name="jobs_market",
            embedding_function=embeddings,
            persist_directory=CHROMA_DIR)
db.add_texts(texts=texts, metadatas=metadatas)

print(f"Đa nap {len(texts)} job vao Chroma")