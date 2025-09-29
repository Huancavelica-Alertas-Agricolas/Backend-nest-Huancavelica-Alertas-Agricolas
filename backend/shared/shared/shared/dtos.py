from pydantic import BaseModel
from typing import Optional, List, Any

class UserDTO(BaseModel):
    id: int
    username: str
    email: str
    phone: Optional[str]
    is_active: bool

class AlertDTO(BaseModel):
    id: int
    type: str
    message: str
    created_at: str
    user_id: int
    station_id: Optional[int]

class DeliveryLogDTO(BaseModel):
    id: int
    alert_id: int
    user_id: int
    status: str
    delivered_at: Optional[str]
    channel: str

class AlertEventDTO(BaseModel):
    id: int
    alert_id: int
    event_type: str
    timestamp: str
    payload: Optional[Any]

class StationDTO(BaseModel):
    id: int
    name: str
    location: str
    lat: float
    lon: float

class SnapshotDTO(BaseModel):
    id: int
    station_id: int
    timestamp: str
    data: dict
