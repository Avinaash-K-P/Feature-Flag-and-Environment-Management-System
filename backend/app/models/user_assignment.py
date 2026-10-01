from app.db.database import Base
from sqlalchemy import Column, Integer, DateTime, ForeignKey, Boolean, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime

class UserAssignment(Base):

    __tablename__ = "user_assignments"

    id = Column(Integer, primary_key=True, index=True) 

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    feature_flag_id = Column(Integer, ForeignKey("feature_flags.id"), nullable=False)

    environment_id = Column(Integer, ForeignKey("environments.id"), nullable=False)

    is_enabled = Column(Boolean, default=True, nullable=False) 

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    updated_at = Column(DateTime, nullable=True)

    __table_args__ = (
        UniqueConstraint( 
            "user_id",
            "feature_flag_id",
            "environment_id",
            name="uq_user_feature_flag_environment"
        ),
    )
    
    user = relationship(
        "User",
        back_populates="feature_assignments"
    )
    
    feature_flag = relationship(
        "FeatureFlag",
        back_populates="user_assignments"
    )
    
    environment = relationship(
        "Environment",
        back_populates="user_assignments"
    )
    