from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Optional
import os

from ..schemas import RegisterUserIn, RegisterUserOut, UsersQuery
from ..models import User, Base
# Debe implementarse get_db en database.py
from ..database import get_db
from shared.phone import to_e164

API_KEY_EXTERNAL = os.getenv("API_KEY_EXTERNAL")

router = APIRouter()

def admin_required(request: Request):
    api_key = request.headers.get("x-api-key")
    if API_KEY_EXTERNAL and api_key != API_KEY_EXTERNAL:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/users/register", response_model=RegisterUserOut)
def register_user(user_in: RegisterUserIn, db: Session = Depends(get_db)):
    # Normalizar teléfono
    phone_e164 = None
    if user_in.phone_e164:
        try:
            phone_e164 = to_e164(user_in.phone_e164, region="PE")
        except Exception:
            raise HTTPException(status_code=400, detail="Teléfono inválido")

    # Validar email único
    if db.query(User).filter_by(email=user_in.email).first():
        raise HTTPException(status_code=409, detail="Email ya registrado")
    # Validar teléfono único si existe
    if phone_e164 and db.query(User).filter_by(phone_e164=phone_e164).first():
        raise HTTPException(status_code=409, detail="Teléfono ya registrado")

    user = User(
        name=user_in.name,
        email=user_in.email,
        phone_e164=phone_e164,
        telegram_chat_id=user_in.telegram_chat_id,
        city=user_in.city,
        allow_email=user_in.allow_email,
        allow_sms=user_in.allow_sms,
        allow_telegram=user_in.allow_telegram,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return RegisterUserOut.model_validate(user, from_attributes=True)


@router.get("/users", response_model=List[RegisterUserOut])
def list_users(
    city: Optional[str] = Query(None),
    allow_email: Optional[bool] = Query(None),
    allow_sms: Optional[bool] = Query(None),
    allow_telegram: Optional[bool] = Query(None),
    skip: int = 0,
    limit: int = 20,
    request: Request = None,
    db: Session = Depends(get_db),
):
    # Proteger endpoint admin si API_KEY_EXTERNAL está definido
    if API_KEY_EXTERNAL:
        admin_required(request)

    query = db.query(User)
    if city:
        query = query.filter(User.city == city)
    if allow_email is not None:
        query = query.filter(User.allow_email == allow_email)
    if allow_sms is not None:
        query = query.filter(User.allow_sms == allow_sms)
    if allow_telegram is not None:
        query = query.filter(User.allow_telegram == allow_telegram)
    users = query.offset(skip).limit(limit).all()
    return [RegisterUserOut.model_validate(u, from_attributes=True) for u in users]


# --- TELEGRAM WEBHOOK ---
@router.post("/telegram/webhook")
def telegram_webhook(request: Request, db: Session = Depends(get_db)):
    import asyncio
    TELEGRAM_SECRET = os.getenv("TELEGRAM_BOT_SECRET_TOKEN")
    # Verificar token secreto
    secret = request.headers.get("X-Telegram-Bot-Api-Secret-Token")
    if not TELEGRAM_SECRET or secret != TELEGRAM_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")

    async def process():
        data = await request.json()
        message = data.get("message", {})
        text = message.get("text", "")
        chat = message.get("chat", {})
        chat_id = str(chat.get("id"))
        # Solo procesar /start
        if text.startswith("/start"):
            # Buscar email o token después de /start
            parts = text.split()
            if len(parts) > 1:
                user_key = parts[1].strip()
                # Buscar por email o token
                user = db.query(User).filter((User.email == user_key) | (User.telegram_chat_id == user_key)).first()
                if user:
                    user.telegram_chat_id = chat_id
                    db.commit()
        return JSONResponse({"ok": True})

    # Garantizar respuesta en <2s
    return asyncio.run(asyncio.wait_for(process(), timeout=1.8))
