import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to: str, subject: str, text: str, html: str = None):
    logger = logging.getLogger("notifier.email")
    try:
        smtp_server = os.getenv("GMAIL_SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.getenv("GMAIL_SMTP_PORT", "587"))
        username = os.getenv("GMAIL_USERNAME")
        password = os.getenv("GMAIL_APP_PASSWORD")
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = username
        msg["To"] = to
        part1 = MIMEText(text, "plain")
        msg.attach(part1)
        if html:
            part2 = MIMEText(html, "html")
            msg.attach(part2)
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(username, password)
            server.sendmail(username, to, msg.as_string())
        logger.info(f"Email enviado a {to}")
        return True, None
    except Exception as e:
        logger.error(f"Error enviando email a {to}: {e}")
        return False, str(e)
