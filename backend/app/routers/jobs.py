from fastapi import APIRouter, Header, HTTPException, Depends
from ..db import AsyncSessionLocal
from ..models import Job
from sqlalchemy.ext.asyncio import AsyncSession
from ..security.api_key_auth import verify_api_key


router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/v1/jobs/{job_id}")
async def get_job(job_id: str, authorization: str = Header(None), db: AsyncSession = Depends(get_db)):
    if not authorization:
        raise HTTPException(401, "Missing API key")
    job = await db.get(Job, job_id)
    if not job:
        raise HTTPException(404, "Job not found")
    return {
        "id": job.id,
        "status": job.status,
        "result": job.result,
        "error": job.error
    }
