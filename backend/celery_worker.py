# optional: if using Celery for heavy tasks
from celery import Celery
from .app.tasks import process_job
from .app.config import REDIS_URL

celery_app = Celery("worker", broker=REDIS_URL, backend=REDIS_URL)
# registration as needed
