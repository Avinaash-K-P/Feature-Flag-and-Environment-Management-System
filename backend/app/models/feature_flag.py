from app.db.database import Base
from sqlalchemy import Boolean, Column, Integer, String, Text, Enum as SQLEnum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from enum import Enum
from datetime import datetime

class FeatureFlagType(str, Enum):
    BOOLEAN="boolean" 
    STRING="string"
    INTEGER="integer"
    JSON="json"

class FeatureFlag(Base):

    __tablename__ = "feature_flags"

    id = Column(Integer, primary_key=True, index=True) 

    name = Column(String(100), nullable=False) 

    description = Column(Text, nullable=False)

    flag_type = Column(SQLEnum(FeatureFlagType), default=FeatureFlagType.BOOLEAN, nullable=False)

    default_value = Column(Text, nullable=False)

    is_active = Column(Boolean, default=True, nullable=False)

    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    updated_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="feature_flag")  

    environment_configs = relationship("FeatureFlagEnvironment", back_populates="feature_flag") 

    user_assignments = relationship(
        "UserAssignment",
        back_populates="feature_flag"
    )

    
    