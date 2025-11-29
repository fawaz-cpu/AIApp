from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db
from ..models import APIKey
from uuid import uuid4

router = APIRouter(prefix="/keys")

@router.post("/keys/generate")
async def generate_key(owner: str, session: AsyncSession = Depends(get_db)):

    key = str(uuid4())
    new_key = APIKey(key=key, owner=owner)
    session.add(new_key)
    await session.commit()
    return {"api_key": key}
