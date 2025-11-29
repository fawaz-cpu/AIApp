from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from .routers import process, templates, jobs, api_keys, admin

from .routers import process, templates, jobs, api_keys
from .db import Base, engine

# 🟢 تعريف Security Scheme علشان يظهر زر Authorize
from fastapi.openapi.utils import get_openapi

API_KEY_HEADER = APIKeyHeader(name="Authorization", auto_error=False)

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="AI Data Processor - Professional API",
    lifespan=lifespan
)

# 🟢 إضافة Routers
app.include_router(api_keys.router)
app.include_router(process.router)
app.include_router(templates.router)
app.include_router(jobs.router)
app.include_router(admin.router)


# 🟢 Customize OpenAPI to show Authorize button
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="AI Data Processor - Professional API",
        version="1.0.0",
        description="AI-powered function calling API with templates, jobs, and API key authentication.",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "APIKeyHeader": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization"
        }
    }
    openapi_schema["security"] = [{"APIKeyHeader": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
