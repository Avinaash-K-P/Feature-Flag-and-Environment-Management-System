from datetime import datetime
from app.db.database import Base
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String, Integer, Text
from sqlalchemy.orm import  relationship

class Environment(Base):

    __tablename__ = "environments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(50), nullable=False)

    description = Column(Text, nullable=False)

    is_active = Column(Boolean, default=True, nullable=False)
    
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    updated_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="environment")

    feature_flag_configs = relationship("FeatureFlagEnvironment", back_populates="environment")

    user_assignments = relationship("UserAssignment", back_populates="environment")