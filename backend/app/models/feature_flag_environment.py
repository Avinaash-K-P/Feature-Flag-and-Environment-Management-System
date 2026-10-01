from app.db.database import Base
from sqlalchemy import Boolean, Column, Integer, String, Text, Enum as SQLEnum, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from enum import Enum
from datetime import datetime

class FeatureFlagEnvironment(Base):

    __tablename__ = "feature_flag_environments"

    id = Column(Integer, primary_key=True, index=True)

    feature_flag_id = Column(Integer, ForeignKey("feature_flags.id"), nullable=False)

    environment_id = Column(Integer, ForeignKey("environments.id"), nullable=False)

    value = Column(Text, nullable=False)

    is_enabled = Column(Boolean, default=True, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    updated_at = Column(DateTime, nullable=True)

    __table_args__ = (
        UniqueConstraint(
            "feature_flag_id",
            "environment_id",
            name="uq_feature_flag_environment"
        ),
    )

    feature_flag = relationship(
        "FeatureFlag",
        back_populates="environment_configs"
    )

    environment = relationship(
        "Environment",
        back_populates="feature_flag_configs"
    )

    feature_rollout = relationship(
        "FeatureRollout", back_populates="feature_flag_environment"
    )


    