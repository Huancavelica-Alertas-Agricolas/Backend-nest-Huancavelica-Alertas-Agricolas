import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND")
    TZ = os.getenv("TZ", "America/Lima")
    # Agrega aquí otras configuraciones necesarias

settings = Settings()
