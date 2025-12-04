from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db
from ..models import Job, Template
from ..tasks import process_job
from uuid import uuid4
import asyncio
from ..security.api_key_auth import verify_api_key

router = APIRouter()

# -------------------------------
#  Create new AI Function Job
# -------------------------------
@router.post("/jobs")
async def create_job(
    payload: dict,
    api_key: str = Depends(verify_api_key),
    session: AsyncSession = Depends(get_db)
):
    prompt = payload.get("prompt")
    response_schema = payload.get("response_schema")
    options = payload.get("options", {})

    if not prompt:
        raise HTTPException(400, "Missing 'prompt' in request.")

    job_id = str(uuid4())

    new_job = Job(
        id=job_id,
        api_key=api_key,    # 👈 تم إضافتها
        input={
            "prompt": prompt,
            "response_schema": response_schema,
            "options": options
        },
        status="pending"
    )

    session.add(new_job)
    await session.commit()

    asyncio.create_task(process_job(job_id))

    return {"job_id": job_id, "status": "pending"}


# -------------------------------
#  Get Job Status / Result
# -------------------------------
@router.get("/jobs/{job_id}")
async def get_job(
    job_id: str,
    api_key: str = Depends(verify_api_key),  # 👈 حماية
    session: AsyncSession = Depends(get_db)
):
    job = await session.get(Job, job_id)
    if not job:
        raise HTTPException(404, "Job not found")

    if job.api_key != api_key:  # 👈 منع الوصول لنتائج الآخرين
        raise HTTPException(403, "Access denied")

    return {
        "id": job.id,
        "status": job.status,
        "input": job.input,
        "result": job.result,
        "error": job.error
    }


# -------------------------------
#  Run Template directly
# -------------------------------
@router.post("/templates/{template_name}/run")
async def run_template(
    template_name: str,
    payload: dict,
    api_key: str = Depends(verify_api_key),   # 👈 تمت إضافتها
    session: AsyncSession = Depends(get_db)
):
    template = await session.get(Template, template_name)
    if not template:
        raise HTTPException(404, "Template not found")

    prompt = template.prompt_template.replace("{{input}}", payload.get("input", ""))

    job_payload = {
        "prompt": prompt,
        "response_schema": template.output_schema
    }

    job_id = str(uuid4())
    new_job = Job(
        id=job_id,
        api_key=api_key,      # 👈 الآن تعمل
        input=job_payload,
        status="pending"
    )

    session.add(new_job)
    await session.commit()

    asyncio.create_task(process_job(job_id))

    return {"job_id": job_id, "status": "pending"}
