from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserAssignStatus

def get_users(db:Session):

    users = db.query(User).all()

    return users 

def get_user(db:Session, user_id:int):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

def update_user_status(db:Session, payload:UserAssignStatus, user_id:int):

    user = get_user(db, user_id)

    user.is_active = payload.is_active # type: ignore

    db.commit()
    db.refresh(user)

    status = "active"

    if user.is_active is False:
        status = "inactive"

    return {
        "message": f"User status changed to {status}"
    }