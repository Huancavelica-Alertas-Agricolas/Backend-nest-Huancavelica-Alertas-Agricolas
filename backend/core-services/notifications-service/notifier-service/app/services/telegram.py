import os
import logging
import requests

def send_telegram(chat_id: str, text: str, parse_mode: str = 'HTML'):
    logger = logging.getLogger("notifier.telegram")
    try:
        token = os.getenv("TELEGRAM_BOT_TOKEN")
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": parse_mode
        }
        resp = requests.post(url, json=payload, timeout=10)
        resp.raise_for_status()
        logger.info(f"Mensaje Telegram enviado a {chat_id}")
        return True, None
    except Exception as e:
        logger.error(f"Error enviando Telegram a {chat_id}: {e}")
        return False, str(e)
