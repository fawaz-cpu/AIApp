from .ai_adapter import AIAdapter
from .models import Job, APIKey
from .db import AsyncSessionLocal
import datetime

ai = AIAdapter()

async def process_job(job_id: str):
    async with AsyncSessionLocal() as session:
        job = await session.get(Job, job_id)
        if not job:
            return
        
        try:
            prompt = job.input.get("prompt")
            schema = job.input.get("response_schema")
            options = job.input.get("options", {})

            # 🟢 استدعاء OpenAI مع التوكنز والتكلفة
            response, tokens_used, cost_usd = await ai.call(prompt, schema, options)

            job.status = "done"
            job.result = response
            job.tokens_used = tokens_used
            job.cost_usd = round(cost_usd, 5)
            job.updated_at = datetime.datetime.utcnow()

            # 🔥 تحديث usage داخل APIKey
            if job.api_key:
                api_key_obj = await session.get(APIKey, job.api_key)
                if api_key_obj:
                    api_key_obj.used_tokens += tokens_used
                    api_key_obj.total_spent += cost_usd

                    # 🚨 إيقاف المفتاح لو تجاوز quota
                    if api_key_obj.used_tokens >= api_key_obj.quota:
                        api_key_obj.active = False

                    session.add(api_key_obj)

        except Exception as e:
            job.status = "failed"
            job.error = str(e)
            job.updated_at = datetime.datetime.utcnow()

        session.add(job)
        await session.commit()
