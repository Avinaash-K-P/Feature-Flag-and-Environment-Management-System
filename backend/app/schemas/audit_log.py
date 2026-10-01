from datetime import datetime
from pydantic import BaseModel, ConfigDict


class AuditLogResponse(BaseModel):
    id: int
    user_id: int
    action: str
    entity_type: str
    entity_id: int
    old_value: dict | None = None
    new_value: dict | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)