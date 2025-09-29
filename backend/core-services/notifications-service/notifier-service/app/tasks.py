
from celery import Celery
from .config import settings
import logging
import redis
import time
from shared.template_renderer import render_template
# from .repositories import ... (para acceso a DB)
# from .services import twilio, email, telegram

celery_app = Celery(
    'notifier',
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND
)
celery_app.conf.timezone = settings.TZ

# Configuración Redis para idempotencia y rate limiting
redis_url = settings.REDIS_URL or "redis://localhost:6379/0"
redis_client = redis.Redis.from_url(redis_url)

@celery_app.task(bind=True, max_retries=5, autoretry_for=(Exception,), retry_backoff=True)
def send_alert_task(self, alert_id: int):
    logger = logging.getLogger("notifier.tasks")
    try:
        # 1. Obtener alerta (de DB local o vía API)
        # alert = ...

        # 2. Determinar destinatarios por city y flags (consultar users-service o DB)
        # users = ...

        # 3. Por cada usuario y canal permitido:
        #   - Renderizar plantilla (Jinja2)
        #   - Verificar idempotencia en Redis (alert_id:user_id:channel)
        #   - Verificar rate limiting en Redis (N/min por canal)
        #   - Enviar (twilio/email/telegram)
        #   - Registrar delivery_log (en DB o API)
        #   - Si error, reintentar con backoff

        # Ejemplo de estructura de loop:
        # for user in users:
        #     for channel in ["sms", "email", "telegram"]:
        #         if not user["allow_"+channel]:
        #             continue
        #         redis_key = f"alert:{alert_id}:user:{user['id']}:ch:{channel}"
        #         if redis_client.get(redis_key):
        #             logger.info(f"Ya enviado: {redis_key}")
        #             continue
        #         # Rate limiting
        #         rl_key = f"rate:{channel}:{user['id']}"
        #         if redis_client.incr(rl_key) > N:
        #             logger.warning(f"Rate limit {channel} para user {user['id']}")
        #             continue
        #         redis_client.expire(rl_key, 60)
        #         # Render y envío
        #         # ...
        #         # Guardar idempotencia
        #         redis_client.set(redis_key, 1, ex=3600)
        #         # Guardar delivery_log
        #         # ...

        logger.info(f"Alerta {alert_id} procesada")
    except Exception as e:
        logger.error(f"Error en send_alert_task({alert_id}): {e}")
        raise self.retry(exc=e)
