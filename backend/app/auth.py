from fastapi import Header, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .db import get_db
from .models import APIKey

async def verify_api_key(
    authorization: str = Header(None),
    session: AsyncSession = Depends(get_db)
):
    # 1) التأكد من وجود الهيدر
    if not authorization:
        raise HTTPException(401, "Missing API Key")

    # 2) دعم Bearer KEY
    # إذا المستخدم أرسل: Authorization: Bearer xxx
    token = authorization.replace("Bearer ", "").strip()

    # 3) البحث عن المفتاح في قاعدة البيانات
    api_key = await session.get(APIKey, token)

    if not api_key:
        raise HTTPException(401, "Invalid API Key — Not Found")

    if not api_key.active:
        raise HTTPException(403, "API Key Disabled")

    if api_key.quota <= 0:
        raise HTTPException(429, "Quota Exceeded")

    # 4) عاد المفتاح بعد التحقق
    return token
