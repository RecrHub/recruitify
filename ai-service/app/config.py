import os
from dotenv import load_dotenv
load_dotenv()

MINIMAX_API_KEY = os.getenv("MINIMAX_API_KEY")
CHROMA_DIR = "./chroma_db"
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
LLM_MODEL = "minimax-m3"