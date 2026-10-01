from pydantic import BaseModel, ConfigDict, Field  
from typing import Optional
from datetime import datetime

class UserAssignmentCreate(BaseModel):
    user_id:int
    feature_flag_id:int 
    environment_id:int 
    is_enabled:bool 

class UserAssignmentUpdate(BaseModel): 
    is_enabled:Optional[bool] = None

class UserAssignmentResponse(BaseModel):
    id:int 
    user_id:int
    feature_flag_id:int 
    environment_id:int 
    is_enabled:int 
    created_at:datetime
    updated_at:datetime|None 

    model_config = ConfigDict(from_attributes=True)
