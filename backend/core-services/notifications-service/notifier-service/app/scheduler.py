import time
import os
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings
from app.models import Base, Alert
from app.tasks import send_alert_task
import logging

# Configuración DB
POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
POSTGRES_DB = os.getenv("POSTGRES_DB", "alerts_db")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)
engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Housekeeping config
LOG_RETENTION_DAYS = int(os.getenv("LOG_RETENTION_DAYS", "30"))

logger = logging.getLogger("notifier.scheduler")


def run_scheduler():
    while True:
        now = datetime.utcnow()
        with SessionLocal() as db:
            # Buscar alertas programadas para enviar
            alerts = db.query(Alert).filter(
                Alert.scheduled_at != None,
                Alert.scheduled_at <= now
            ).all()
            for alert in alerts:
                logger.info(f"Encolando alerta {alert.id} programada para {alert.scheduled_at}")
                send_alert_task.delay(alert.id)
            # Housekeeping: eliminar logs antiguos
            cutoff = now - timedelta(days=LOG_RETENTION_DAYS)
            try:
                db.execute("DELETE FROM delivery_logs WHERE delivered_at < :cutoff", {"cutoff": cutoff})
                db.commit()
                logger.info("Housekeeping: logs antiguos eliminados")
            except Exception as e:
                logger.error(f"Error en housekeeping: {e}")
        time.sleep(60)

if __name__ == "__main__":
    run_scheduler()
