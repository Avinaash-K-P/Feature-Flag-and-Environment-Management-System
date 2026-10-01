from datetime import datetime

from pydantic import BaseModel, ConfigDict
from typing import Optional

class FeatureFlagCreate(BaseModel):
    name:str
    description:str 
    flag_type:str
    default_value:str
    is_active:bool 

class FeatureFlagUpdate(BaseModel):
    name:Optional[str] = None
    description:Optional[str] = None
    flag_type:Optional[str] = None
    default_value:Optional[str] = None
    is_active:Optional[bool] = None

class FeatureFlagResponse(BaseModel):
    id:int
    name:str
    description:str|None 
    flag_type:str
    default_value:str
    is_active:bool
    created_by:int
    created_at:datetime
    updated_at:datetime|None 

    model_config = ConfigDict(
        from_attributes=True
    )