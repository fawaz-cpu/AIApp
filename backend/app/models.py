from sqlalchemy import Column, String, Integer, Text, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from .db import Base
from sqlalchemy import Column, String, Integer, Float

class APIKey(Base):
    __tablename__ = "api_keys"
    key = Column(String, primary_key=True)
    owner = Column(String)
    quota = Column(Integer, default=10000)   # عدد التوكن المسموح بها
    used_tokens = Column(Integer, default=0) # عدد التوكن المستخدمة
    total_spent = Column(Float, default=0.0) # التكلفة بالدولار


class Template(Base):
    __tablename__ = "templates"
    name = Column(String, primary_key=True, index=True)
    owner = Column(String, nullable=True)
    prompt = Column(Text)
    input_schema = Column(JSON, nullable=True)
    output_schema = Column(JSON, nullable=True)
    public = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Job(Base):
    __tablename__ = "jobs"
    id = Column(String, primary_key=True, index=True)
    api_key = Column(String, nullable=True)
    status = Column(String, default="pending")
    input = Column(JSON, nullable=True)
    result = Column(JSON, nullable=True)
    error = Column(Text, nullable=True)

    tokens_used = Column(Integer, default=0)      # كم توكن استخدم
    cost_usd = Column(Float, default=0.0)         # كم كلف بالدولار
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

