
from sqlalchemy import Column, Integer, String, DateTime, Index
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Alert(Base):
	__tablename__ = "alerts"

	id = Column(Integer, primary_key=True, index=True)
	title = Column(String, nullable=False)
	message = Column(String, nullable=False)
	city = Column(String, nullable=True, index=True)
	scheduled_at = Column(DateTime, nullable=True, index=True)
	source = Column(String, nullable=False)
	created_at = Column(DateTime, default=datetime.datetime.utcnow)

	__table_args__ = (
		Index('ix_alerts_city', 'city'),
		Index('ix_alerts_scheduled_at', 'scheduled_at'),
	)
