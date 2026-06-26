from langchain_openai import ChatOpenAI
from app.config import LLM_MODEL, MINIMAX_API_KEY

llm = ChatOpenAI(
    model=LLM_MODEL,
    api_key=MINIMAX_API_KEY,
    base_url="https://router-api.0g.ai/v1",
    temperature=0.2
)

def generate_advice(prompt: str) -> str:
    return llm.invoke(prompt).content