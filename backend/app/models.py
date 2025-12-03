from sqlalchemy import Column, String, Integer, Text, JSON, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from .db import Base
from datetime import datetime


# =====================================
# 🟢 جدول المستخدمين User
# =====================================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    role = Column(String, default="user")  # user / admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    api_keys = relationship("APIKey", back_populates="owner_user")


# =====================================
# 🟡 جدول API Keys (معدّل لربط المستخدم)
# =====================================
class APIKey(Base):
    __tablename__ = "api_keys"

    key = Column(String, primary_key=True)
    owner = Column(String, nullable=True)  # تبقى كما هي لو تبي
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    quota = Column(Integer, default=10000)
    used_tokens = Column(Integer, default=0)
    total_spent = Column(Float, default=0.0)
    active = Column(Boolean, default=True)

    owner_user = relationship("User", back_populates="api_keys")


# =====================================
# Template
# =====================================
class Template(Base):
    __tablename__ = "templates"
    name = Column(String, primary_key=True, index=True)
    owner = Column(String, nullable=True)
    prompt = Column(Text)
    input_schema = Column(JSON, nullable=True)
    output_schema = Column(JSON, nullable=True)
    public = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# =====================================
# Job
# =====================================
class Job(Base):
    __tablename__ = "jobs"
    id = Column(String, primary_key=True, index=True)
    api_key = Column(String, nullable=True)
    status = Column(String, default="pending")
    input = Column(JSON, nullable=True)
    result = Column(JSON, nullable=True)
    error = Column(Text, nullable=True)

    tokens_used = Column(Integer, default=0)
    cost_usd = Column(Float, default=0.0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
