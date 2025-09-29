
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

class AlertIn(BaseModel):
	title: str
	message: str
	city: Optional[str] = None
	scheduled_at: Optional[str] = None  # ISO 8601
	source: str

	model_config = ConfigDict(from_attributes=True)

class AlertOut(BaseModel):
	id: int
	title: str
	message: str
	city: Optional[str] = None
	scheduled_at: Optional[str] = None
	source: str
	created_at: str

	model_config = ConfigDict(from_attributes=True)

class AlertsQuery(BaseModel):
	city: Optional[str] = None
	scheduled_at: Optional[str] = None
	source: Optional[str] = None

	model_config = ConfigDict(from_attributes=True)
