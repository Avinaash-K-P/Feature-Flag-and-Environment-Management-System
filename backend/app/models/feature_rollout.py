from app.db.database import Base 
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime 

class FeatureRollout(Base):

    __tablename__ = "feature_rollouts"

    id = Column(Integer, primary_key=True, index=True)

    feature_flag_environment_id = Column(Integer, ForeignKey("feature_flag_environments.id"), nullable=False) 

    rollout_percentage = Column(Integer, nullable=False)

    is_active = Column(Boolean, default=True, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    updated_at = Column(DateTime, nullable=True)

    feature_flag_environment = relationship("FeatureFlagEnvironment", back_populates="feature_rollout")