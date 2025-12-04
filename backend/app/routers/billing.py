from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..models import APIKey
from ..db import get_db
from ..security.api_key_auth import verify_api_key
from sqlalchemy import select
from fastapi import HTTPException


router = APIRouter(prefix="/billing", tags=["Billing"])

@router.get("/usage")
async def get_usage(api_key: str = Depends(verify_api_key), db: AsyncSession = Depends(get_db)):
    key = await db.get(APIKey, api_key)
    if not key:
        raise HTTPException(404, "API key not found")
    
    return {
        "api_key": api_key,
        "used_tokens": key.used_tokens,
        "total_spent_usd": round(key.total_spent, 4),
        "remaining_quota": key.quota - key.used_tokens
    }
