import os
from dotenv import load_dotenv

# تحديد المسار الصحيح لملف .env حتى لو مكان تشغيل التطبيق تغيّر
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)  # تحميل الملف من مساره الصحيح

# قراءة المتغيرات
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./dev.db")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SERVICE_PORT = int(os.getenv("SERVICE_PORT", 8000))
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# فحص المفتاح
if not OPENAI_API_KEY:
    print("⚠️ Warning: OPENAI_API_KEY is not loaded!")
else:
    print("🔑 OpenAI API key loaded successfully")
