import asyncio
from app.db import engine, Base

async def init():
    async with engine.begin() as conn:
        print("Creating tables...")
        await conn.run_sync(Base.metadata.create_all)
        print("Done.")

if __name__ == "__main__":
    asyncio.run(init())
