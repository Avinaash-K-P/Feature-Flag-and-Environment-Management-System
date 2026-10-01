from datetime import datetime

from pydantic import BaseModel, ConfigDict


class FeatureFlagEnvironmentCreate(BaseModel):
    feature_flag_id: int
    environment_id: int
    value: str | None = None
    is_enabled: bool = False


class FeatureFlagEnvironmentUpdate(BaseModel):
    value: str | None = None
    is_enabled: bool | None = None


class FeatureFlagEnvironmentResponse(BaseModel):
    id: int
    feature_flag_id: int
    environment_id: int
    value: str | None = None
    is_enabled: bool
    created_at: datetime
    updated_at: datetime|None

    model_config = ConfigDict(from_attributes=True)