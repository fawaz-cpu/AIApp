import openai
import os
import json
from .config import OPENAI_API_KEY

class AIAdapter:
    def __init__(self):
        api_key = OPENAI_API_KEY or os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("❌ OpenAI API key is missing")

        openai.api_key = api_key

async def call(self, prompt, schema=None, options=None):
    messages = [{"role": "user", "content": prompt}]

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        functions=[{
            "name": "process_response",
            "description": "Return structured JSON output",
            "parameters": schema
        }] if schema else None,
        function_call={"name": "process_response"} if schema else "auto"
    )

    usage = response.usage
    tokens_used = usage.total_tokens
    cost = tokens_used * 0.00003  # تقريبي

    return response, tokens_used, cost

