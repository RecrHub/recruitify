"""LLM client — NVIDIA integrate API (OpenAI-compatible).

Endpoint: {NVIDIA_BASE_URL}/chat/completions
Auth:     Bearer NVIDIA_API_KEY
Format:   OpenAI Chat Completions (messages: [{role, content}])

Migrated từ agentrouter/Anthropic — prompt format Anthropic (`messages: [{content}]`)
khác OpenAI (`messages: [{role, content}]`). Caller (market.py) chỉ cần truyền
1 string prompt; ta wrap nó thành user message.
"""
from openai import OpenAI

from app.config import NVIDIA_BASE_URL, NVIDIA_API_KEY, LLM_MODEL


def _get_client() -> OpenAI:
    """Lazy init — tránh tạo client lúc import (fail sớm nếu thiếu API key)."""
    if not NVIDIA_API_KEY:
        raise RuntimeError(
            "NVIDIA_API_KEY chưa được set. "
            "Thêm vào .env hoặc export NVIDIA_API_KEY=... rồi restart server."
        )
    return OpenAI(api_key=NVIDIA_API_KEY, base_url=NVIDIA_BASE_URL)


def generate_advice(
    prompt: str,
    *,
    max_tokens: int = 512,
    temperature: float = 0.2,
    model: str | None = None,
) -> str:
    """Gọi LLM và trả về text advice.

    Args:
        prompt: Nội dung user message (string thuần).
        max_tokens: Giới hạn output — mặc định 512 đủ cho prompt market analyzer.
        temperature: Mặc định 0.2 cho output ổn định (gap analysis cần consistency).
        model: Override model mặc định từ config (hữu ích cho A/B test).

    Returns:
        Nội dung text trả về từ assistant message.
    """
    client = _get_client()
    response = client.chat.completions.create(
        model=model or LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=temperature,
    )
    return response.choices[0].message.content or ""
