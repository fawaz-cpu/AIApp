from fastapi import FastAPI, HTTPException
from fastapi.openapi.utils import get_openapi
from fastapi.security import APIKeyHeader

from .routers import process, templates, jobs, api_keys, admin, auth
from .db import Base, engine


API_KEY_HEADER = APIKeyHeader(name="Authorization", auto_error=False)

app = FastAPI(
    title="AI Data Processor - Professional API",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)


# -----------------------------
# 🚀 مسار مؤقت لإنشاء الجداول
# -----------------------------
@app.get("/__init_db_once__")
async def init_db_once(secret: str):
    """
    مسار لإنشاء الجداول داخل Render.
    استخدمه مرة واحدة فقط.
    """
    if secret != "FawazStrongKey2025":
        raise HTTPException(status_code=403, detail="Forbidden")

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    return {"status": "tables created"}


# -----------------------------
# Routers
# -----------------------------
app.include_router(api_keys.router)
app.include_router(process.router)
app.include_router(templates.router)
app.include_router(jobs.router)
app.include_router(admin.router)
app.include_router(auth.router)


# -----------------------------
# Custom OpenAPI
# -----------------------------
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
