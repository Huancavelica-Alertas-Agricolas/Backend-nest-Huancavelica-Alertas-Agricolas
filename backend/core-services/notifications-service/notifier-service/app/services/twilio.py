import os
from twilio.rest import Client
import logging

def send_sms(to_e164: str, body: str):
    logger = logging.getLogger("notifier.twilio")
    try:
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_number = os.getenv("TWILIO_FROM_NUMBER")
        client = Client(account_sid, auth_token)
        msg = client.messages.create(
            body=body,
            from_=from_number,
            to=to_e164
        )
        logger.info(f"SMS enviado a {to_e164} (sid={msg.sid})")
        return True, msg.sid, None
    except Exception as e:
        logger.error(f"Error enviando SMS a {to_e164}: {e}")
        return False, None, str(e)
