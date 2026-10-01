from pydantic import BaseModel, ConfigDict

class UserAssignStatus(BaseModel):
    is_active:bool

class UserResponse(BaseModel):
    id:int
    role_id:int 
    username:str 
    email:str 
    is_active:bool 

    model_config = ConfigDict(from_attributes=True)