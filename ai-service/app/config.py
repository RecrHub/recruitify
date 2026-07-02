import os
from pathlib import Path
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv(Path(__file__).resolve().parent.parent / ".env", override=True)

ANTHROPIC_AUTH_TOKEN = os.getenv("ANTHROPIC_AUTH_TOKEN")

CHROMA_DIR = "./chroma_db"
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
LLM_MODEL = "claude-opus-4-6"

client = Anthropic(
    api_key=ANTHROPIC_AUTH_TOKEN,
    base_url="https://agentrouter.org",
)