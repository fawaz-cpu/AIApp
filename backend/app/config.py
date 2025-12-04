import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)

# سيتم قراءته من Environment Variables في Render (أفضل وأصحّ)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./dev.db")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ADMIN_KEY = os.getenv("ADMIN_KEY")
SERVICE_PORT = int(os.getenv("SERVICE_PORT", 8000))
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# فقط للتأكد أن مفتاح OpenAI موجود
if not OPENAI_API_KEY:
    print("⚠️ Warning: OPENAI_API_KEY is not loaded!")
else:
    print("🔑 OpenAI API key loaded successfully")
