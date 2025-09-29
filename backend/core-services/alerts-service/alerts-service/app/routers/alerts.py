from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from ..schemas import AlertIn, AlertOut, AlertsQuery
from ..models import Alert, Base
# Debe implementarse get_db en database.py
from ..database import get_db
from datetime import datetime

API_KEY_EXTERNAL = os.getenv("API_KEY_EXTERNAL")

router = APIRouter()

def admin_required(request: Request):
    api_key = request.headers.get("x-api-key")
    if API_KEY_EXTERNAL and api_key != API_KEY_EXTERNAL:
        raise HTTPException(status_code=401, detail="Unauthorized")

# Simulación de Celery task
# En producción, importar y usar send_alert_task.delay(alert_id)
def send_alert_task(alert_id: int):
    print(f"[Celery] Enviando alerta {alert_id}")

@router.post("/alerts", response_model=AlertOut)
def create_alert(alert_in: AlertIn, request: Request, db: Session = Depends(get_db)):
    if API_KEY_EXTERNAL:
        admin_required(request)
    scheduled_at = None
    if alert_in.scheduled_at:
        try:
            scheduled_at = datetime.fromisoformat(alert_in.scheduled_at)
        except Exception:
            raise HTTPException(status_code=400, detail="scheduled_at inválido")
    alert = Alert(
        title=alert_in.title,
        message=alert_in.message,
        city=alert_in.city,
        scheduled_at=scheduled_at,
        source=alert_in.source,
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    # Publicar tarea Celery
    send_alert_task(alert.id)
    return AlertOut.model_validate(alert, from_attributes=True)

@router.post("/alerts/{alert_id}/send-now")
def send_now(alert_id: int, request: Request, db: Session = Depends(get_db)):
    if API_KEY_EXTERNAL:
        admin_required(request)
    alert = db.query(Alert).filter_by(id=alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alerta no encontrada")
    send_alert_task(alert.id)
    return {"ok": True, "alert_id": alert.id}

@router.get("/alerts", response_model=List[AlertOut])
def list_alerts(
    city: Optional[str] = Query(None),
    scheduled_at: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    query = db.query(Alert)
    if city:
        query = query.filter(Alert.city == city)
    if scheduled_at:
        try:
            dt = datetime.fromisoformat(scheduled_at)
            query = query.filter(Alert.scheduled_at == dt)
        except Exception:
            raise HTTPException(status_code=400, detail="scheduled_at inválido")
    if source:
        query = query.filter(Alert.source == source)
    alerts = query.offset(skip).limit(limit).all()
    return [AlertOut.model_validate(a, from_attributes=True) for a in alerts]
