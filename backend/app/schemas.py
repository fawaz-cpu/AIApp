from pydantic import BaseModel
from typing import Optional, Any, Dict

class DataPayload(BaseModel):
    type: str  # text | json | file
    content: Optional[Any] = None
    file_id: Optional[str] = None

class ProcessRequest(BaseModel):
    template: Optional[str] = None
    description: Optional[str] = None
    data: Optional[DataPayload] = None
    response_schema: Optional[Dict] = None
    options: Optional[Dict] = None

class ProcessResponse(BaseModel):
    job_id: str
    status: str
