from anthropic import Anthropic
from app.config import LLM_MODEL, ANTHROPIC_AUTH_TOKEN

client = Anthropic(
    api_key=ANTHROPIC_AUTH_TOKEN,
    base_url="https://agentrouter.org",
    default_headers={
        "User-Agent": "claude-cli/1.0.0 (external, cli)",
        "x-app": "cli",
    },
)

def generate_advice(prompt: str) -> str:
    response = client.messages.create(
        model=LLM_MODEL,
        max_tokens=512,
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.content[0].text