import os
from typing import List

class Settings:
    ALLOWED_ORIGINS: List[str] = os.getenv("ALLOWED_ORIGINS", "*").split(",")

settings = Settings()
