from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_role
from app.schemas.user import UserResponse, UserAssignStatus
from app.services.user_service import get_user, get_users, update_user_status

router = APIRouter(tags=["User Management"])

@router.get("/manage-users", response_model=list[UserResponse])
def list_users(
    db:Session=Depends(get_db),
    current_user = Depends(verify_role("admin"))
):
    return get_users(db=db)

@router.get("/manage-users/{id}", response_model=UserResponse)
def view_user(
    id:int,
    db:Session=Depends(get_db),
    current_user = Depends(verify_role("admin"))
):
    return get_user(db=db, user_id=id)

@router.put("/manage-users/{id}")
def edit_user_status(
    id:int,
    payload: UserAssignStatus,
    db:Session=Depends(get_db),
    current_user = Depends(verify_role("admin"))
):
    return update_user_status(db=db, payload=payload, user_id=id)