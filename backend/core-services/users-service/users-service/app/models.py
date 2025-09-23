
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Index
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class User(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True, index=True)
	name = Column(String, nullable=False)
	email = Column(String, unique=True, index=True, nullable=False)
	phone_e164 = Column(String, unique=True, index=True, nullable=True)
	telegram_chat_id = Column(String, nullable=True)
	city = Column(String, index=True, nullable=True)
	allow_email = Column(Boolean, default=True)
	allow_sms = Column(Boolean, default=True)
	allow_telegram = Column(Boolean, default=True)
	created_at = Column(DateTime, default=datetime.datetime.utcnow)

	__table_args__ = (
		Index('ix_users_city', 'city'),
		Index('ix_users_email', 'email'),
		Index('ix_users_phone_e164', 'phone_e164'),
	)
