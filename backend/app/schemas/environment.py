from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EnvironmentCreate(BaseModel):
    name: str
    description: str | None = None
    is_active: bool = True

class EnvironmentUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    is_active: bool | None = None

class EnvironmentResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    is_active: bool
    created_by:int
    created_at: datetime
    updated_at: datetime|None

    model_config = ConfigDict(from_attributes=True)