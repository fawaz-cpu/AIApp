from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import uuid4

from ..db import get_db
from ..models import APIKey, User
from ..security.user_auth import get_current_user, get_admin_user

router = APIRouter(prefix="/keys", tags=["API Keys"])


# ============================================================
# 1) المستخدم العادي يولد مفتاح لنفسه فقط
# 2) الأدمن يقدر يولد مفتاح لأي مستخدم (user_id)
# ============================================================
@router.post("/generate")
async def generate_key(
    session: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),   # المستخدم الحالي
    user_id: int | None = None                        # اختيارياً للأدمن
):

    # لو المستخدم عادي وما عطى user_id → نولد له مفتاح لنفسه
    if user_id is None:
        owner_id = current_user.id

    else:
        # لو المستخدم حاول يولد مفتاح لشخص آخر وهو ليس admin → ممنوع
        if current_user.role != "admin":
            raise HTTPException(403, "Only admin can generate keys for other users")

        # هل المستخدم موجود؟
        result = await session.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(404, "User not found")

        owner_id = user_id

    # توليد المفتاح
    key = str(uuid4())

    new_key = APIKey(
        key=key,
        owner_id=owner_id,
        quota=10000,
        active=True
    )

    session.add(new_key)
    await session.commit()

    return {
        "api_key": key,
        "owner_id": owner_id
    }
