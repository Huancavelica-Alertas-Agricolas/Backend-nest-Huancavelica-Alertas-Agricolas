import logging
import json
from typing import Optional

def get_json_logger(name: str = "city_alerts_shared"):
    logger = logging.getLogger(name)
    handler = logging.StreamHandler()
    formatter = JsonLogFormatter()
    handler.setFormatter(formatter)
    if not logger.handlers:
        logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    return logger

class JsonLogFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "level": record.levelname,
            "message": record.getMessage(),
            "request_id": getattr(record, "request_id", None),
            "time": self.formatTime(record, self.datefmt),
        }
        return json.dumps(log_record)

# Uso:
# logger = get_json_logger()
# logger.info("Mensaje", extra={"request_id": "abc-123"})
