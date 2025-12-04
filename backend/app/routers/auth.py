from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ..db import get_db
from ..models import User
from ..security.user_auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
async def signup(email: str, password: str, session: AsyncSession = Depends(get_db)):
    # تحقق إذا الإيميل مسجل مسبقاً
    result = await session.execute(select(User).where(User.email == email))
    existing = result.scalar_one_or_none()

    if existing:
        raise HTTPException(400, "Email already registered")

    hashed = hash_password(password)
    user = User(email=email, password=hashed, role="user")

    session.add(user)
    await session.commit()

    return {"message": "User created"}


@router.post("/login")
async def login(email: str, password: str, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.password):
        raise HTTPException(401, "Invalid email or password")

    token = create_access_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
async def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role
    }
