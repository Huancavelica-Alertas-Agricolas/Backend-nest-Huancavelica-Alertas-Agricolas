
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

class RegisterUserIn(BaseModel):
	name: str
	email: str
	phone_e164: Optional[str] = None
	telegram_chat_id: Optional[str] = None
	city: Optional[str] = None
	allow_email: Optional[bool] = True
	allow_sms: Optional[bool] = True
	allow_telegram: Optional[bool] = True

	model_config = ConfigDict(from_attributes=True)

class RegisterUserOut(BaseModel):
	id: int
	name: str
	email: str
	phone_e164: Optional[str] = None
	telegram_chat_id: Optional[str] = None
	city: Optional[str] = None
	allow_email: bool
	allow_sms: bool
	allow_telegram: bool
	created_at: str

	model_config = ConfigDict(from_attributes=True)

class UsersQuery(BaseModel):
	city: Optional[str] = None
	email: Optional[str] = None
	phone_e164: Optional[str] = None

	model_config = ConfigDict(from_attributes=True)
