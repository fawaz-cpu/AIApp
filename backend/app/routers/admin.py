# backend/app/routers/admin.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db
from ..models import Job, APIKey
from sqlalchemy import select
from ..security.admin_auth import get_admin_user
from ..models import User

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(get_admin_user)]
)

@router.get("/jobs")
async def list_all_jobs(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Job))
    jobs = result.scalars().all()
    return jobs


@router.get("/keys")
async def list_api_keys(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(APIKey))
    keys = result.scalars().all()
    return keys
