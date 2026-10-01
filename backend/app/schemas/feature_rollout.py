from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime 

class FeatureRolloutCreate(BaseModel):
    feature_flag_environement_id:int
    rollout_percentage:int = Field(..., ge=0, le=100)
    is_active: bool 

class FeatureRolloutUpdate(BaseModel):
    rollout_percentage:int = Field(..., ge=0, le=100)
    is_active: bool | None = None         

class FeatureRolloutResponse(BaseModel):
    id:int
    feature_flag_environement_id:int
    rollout_percentage:int
    is_active: bool 
    created_at: datetime
    updated_at: datetime|None 

    model_config = ConfigDict(
        from_attributes=True
    )