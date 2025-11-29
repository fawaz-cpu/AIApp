from fastapi import Header, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .db import get_db
from .models import APIKey

async def verify_api_key(
    authorization: str = Header(None),
    session: AsyncSession = Depends(get_db)
):
    if not authorization:
        raise HTTPException(401, "Missing API Key")

    api_key = await session.get(APIKey, authorization)
    
    if not api_key:
        raise HTTPException(401, "Invalid API Key")
    
    if not api_key.active:
        raise HTTPException(403, "API Key is disabled")

    if api_key.quota <= 0:
        raise HTTPException(429, "Quota exceeded")

    return authorization
