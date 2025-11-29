from fastapi import APIRouter, Body, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_db
from ..models import Template, APIKey
from ..auth import verify_api_key

router = APIRouter(prefix="/v1/templates")


# -------------------------------------
#  Create Template (Protected)
# -------------------------------------
@router.post("")
async def create_template(
    payload: dict = Body(...),
    api_key: str = Depends(verify_api_key),   # 👈 بدل Header
    db: AsyncSession = Depends(get_db)
):
    name = payload.get("name")
    if not name:
        raise HTTPException(400, "Template name required")

    # 🟢 ربط القالب بصاحب المفتاح (مالك حقيقي)
    owner = api_key  

    tpl = Template(
        name=name,
        owner=owner,
        prompt=payload.get("prompt", ""),
        input_schema=payload.get("input_schema"),
        output_schema=payload.get("output_schema"),
        public=payload.get("public", True)
    )

    db.add(tpl)
    await db.commit()
    return {"status": "created", "template": name}


# -------------------------------------
#  List Templates (Public + Private)
# -------------------------------------
@router.get("")
async def list_templates(
    api_key: str = Depends(verify_api_key),
    db: AsyncSession = Depends(get_db)
):
    # 🔍 نعرض القوالب العامة + الخاصة بالمالك فقط
    query = select(Template).where(
        (Template.public == True) | (Template.owner == api_key)
    )

    res = await db.execute(query)
    templates = res.scalars().all()

    return {
        "templates": [
            {
                "name": tpl.name,
                "public": tpl.public,
                "owner": tpl.owner,
                "created_at": tpl.created_at
            }
            for tpl in templates
        ]
    }
