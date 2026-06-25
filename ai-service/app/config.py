import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

# HuggingFace embedding chay local (sentence-transformers), khong can API key.
EMBED_MODEL = os.getenv(
    "EMBED_MODEL",
    "sentence-transformers/all-MiniLM-L6-v2",
)
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")

# Thu muc luu vector DB (path tuyet doi, chay on bat ke cwd nao).
CHROMA_DIR = str(Path(__file__).resolve().parent / "chroma_db")
