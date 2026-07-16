import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env", override=True)

# --- LLM (NVIDIA integrate API — OpenAI-compatible) ---
NVIDIA_BASE_URL = os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1")
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "mistralai/mistral-small-4-119b-2603")

# --- Embeddings + Vector DB ---
CHROMA_DIR = "./chroma_db"
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
