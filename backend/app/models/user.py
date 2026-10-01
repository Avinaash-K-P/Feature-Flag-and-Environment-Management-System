from app.db.database import Base
from sqlalchemy import Boolean, Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)

    username = Column(String(50), nullable=False)

    email = Column(String(50), nullable=False) 

    password = Column(String(100), nullable=False) 

    is_active = Column(Boolean, default=True, nullable=False)

    reset_token = Column(String(100), nullable=True)

    reset_token_expiry = Column(DateTime, nullable=True)

    role = relationship("Role", back_populates="user")

    feature_flag = relationship("FeatureFlag", back_populates="user")

    environment = relationship("Environment", back_populates="user")

    feature_assignments = relationship( "UserAssignment", back_populates="user")

    audit_logs = relationship("AuditLog", back_populates="user")