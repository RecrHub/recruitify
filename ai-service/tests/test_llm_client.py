"""Smoke test cho LLM client — verify request shape đúng NVIDIA integrate API
(OpenAI-compatible) mà không cần gọi API thật.

Mock OpenAI client để capture request args, assert:
- base_url đúng NVIDIA_BASE_URL
- Authorization header dùng NVIDIA_API_KEY (Bearer)
- model name đúng (LLM_MODEL hoặc override)
- messages có đúng 1 user message với prompt
- temperature + max_tokens được pass đúng
- response.choices[0].message.content được trả về

Chạy:
    cd ai-service && venv/bin/pytest tests/test_llm_client.py -v
"""
import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))


# ============================================================
# Fixtures
# ============================================================

@pytest.fixture
def mock_openai_class(monkeypatch):
    """Patch openai.OpenAI trong app.llm.client module — capture mọi instance + call."""
    # Set fake API key để _get_client() không raise RuntimeError trong test env
    monkeypatch.setattr("app.llm.client.NVIDIA_API_KEY", "test-key-fake-nvidia")

    instances = []

    def factory(*args, **kwargs):
        # Build a MagicMock đóng vai OpenAI client
        mock_client = MagicMock()
        mock_client.chat.completions.create = MagicMock(
            return_value=_build_fake_response("Mocked advice text")
        )
        instances.append({"args": args, "kwargs": kwargs, "client": mock_client})
        return mock_client

    # Patch ngay tại module nơi nó được import (app.llm.client), không phải openai package
    monkeypatch.setattr("app.llm.client.OpenAI", factory)
    return instances


def _build_fake_response(content: str):
    """Giả lập OpenAI ChatCompletion response."""
    resp = MagicMock()
    resp.choices = [MagicMock()]
    resp.choices[0].message.content = content
    return resp


# ============================================================
# Tests
# ============================================================

def test_generate_advice_uses_nvidia_base_url_and_bearer_auth(mock_openai_class):
    """Client phải được tạo với NVIDIA_BASE_URL và Bearer NVIDIA_API_KEY."""
    # Import sau khi patch để _get_client() dùng factory đã mock
    from app.llm.client import generate_advice

    generate_advice("hello world")

    assert len(mock_openai_class) == 1, "OpenAI client phải được tạo đúng 1 lần"
    init_kwargs = mock_openai_class[0]["kwargs"]

    # base_url phải trỏ về NVIDIA
    assert "base_url" in init_kwargs
    assert init_kwargs["base_url"] == "https://integrate.api.nvidia.com/v1", (
        f"Wrong base_url: {init_kwargs['base_url']}"
    )

    # api_key phải là NVIDIA_API_KEY (Bearer token)
    assert "api_key" in init_kwargs
    assert init_kwargs["api_key"], "api_key phải được truyền"


def test_generate_advice_sends_correct_chat_completion_payload(mock_openai_class):
    """Verify request body đúng OpenAI format: model + messages + temperature + max_tokens."""
    from app.llm.client import generate_advice

    generate_advice("Analyze this job posting", max_tokens=800, temperature=0.5)

    create_mock = mock_openai_class[0]["client"].chat.completions.create
    assert create_mock.call_count == 1

    call_kwargs = create_mock.call_args.kwargs
    assert call_kwargs["model"] == "z-ai/glm-5.2", (
        f"Model phải là z-ai/glm-5.2 (mặc định NVIDIA), got: {call_kwargs['model']}"
    )
    assert call_kwargs["messages"] == [{"role": "user", "content": "Analyze this job posting"}]
    assert call_kwargs["max_tokens"] == 800
    assert call_kwargs["temperature"] == 0.5


def test_generate_advice_returns_assistant_content(mock_openai_class):
    """Output phải là content từ response.choices[0].message.content."""
    from app.llm.client import generate_advice

    result = generate_advice("test prompt")
    assert result == "Mocked advice text"


def test_generate_advice_default_max_tokens_and_temperature(mock_openai_class):
    """Default values phải ổn định cho prompt market analyzer (không bị đổi đột ngột)."""
    from app.llm.client import generate_advice

    generate_advice("test")

    call_kwargs = mock_openai_class[0]["client"].chat.completions.create.call_args.kwargs
    assert call_kwargs["max_tokens"] == 512
    assert call_kwargs["temperature"] == 0.2


def test_generate_advice_supports_model_override(mock_openai_class):
    """Param `model` phải override LLM_MODEL default — hữu ích cho A/B test."""
    from app.llm.client import generate_advice

    generate_advice("test", model="meta/llama-3.1-70b-instruct")

    call_kwargs = mock_openai_class[0]["client"].chat.completions.create.call_args.kwargs
    assert call_kwargs["model"] == "meta/llama-3.1-70b-instruct"


def test_generate_advice_handles_empty_content_gracefully(monkeypatch):
    """Nếu content = None (một số response streaming có thể trả về None), trả về '' thay vì crash."""
    monkeypatch.setattr("app.llm.client.NVIDIA_API_KEY", "test-key-fake-nvidia")

    # Factory trả về content=None ngay từ đầu — _get_client() tạo instance mới
    # mỗi lần gọi nên không thể mutate mock cũ, phải config từ đầu.
    def factory(*args, **kwargs):
        mock_client = MagicMock()
        mock_client.chat.completions.create = MagicMock(
            return_value=_build_fake_response(None)
        )
        return mock_client

    monkeypatch.setattr("app.llm.client.OpenAI", factory)

    from app.llm.client import generate_advice

    result = generate_advice("test")
    assert result == ""


def test_missing_api_key_raises_runtime_error(monkeypatch):
    """Nếu NVIDIA_API_KEY chưa set, phải raise RuntimeError có message rõ ràng."""
    monkeypatch.setattr("app.llm.client.NVIDIA_API_KEY", None)

    from app.llm.client import generate_advice

    with pytest.raises(RuntimeError, match="NVIDIA_API_KEY chưa được set"):
        generate_advice("test")
