from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.profile import UpdateProfile
from app.models.user import User
from app.services.audit_log_service import create_audit_log
from app.utils.cache import get_cache, set_cache, delete_cache

def get_profile(db:Session, user_id:int):

    cache_key = f"profile:{user_id}"

    # Check Redis first
    cached_profile = get_cache(cache_key)

    if cached_profile is not None:
        return {
            "message":"User profile fetched",
            "data": cached_profile
        }

    profile = db.query(User).filter(
        User.id == user_id        
    ).first()

    if not profile:
        raise HTTPException(status_code=404, detail="User not found")

    data = {
        "id": profile.id,
        "username": profile.username,
        "email": profile.email,
        "role_id": profile.role_id 
    }
    
    set_cache(
        cache_key,
        data,
        expire=300
    )

    return {
        "message":"User profile fetched",
        "data": data
    }

def update_profile(db:Session, payload: UpdateProfile, user_id:int):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user: 
        raise HTTPException(status_code=404, detail="User not found")

    user.username = payload.username # type: ignore
    user.email = payload.email # type: ignore

    db.commit()
    db.refresh(user)

    create_audit_log(
        db=db,
        user_id = user_id,
        action = "UPDATED", 
        entity_type = "Profile",
        entity_id = user_id # type: ignore
    )

    delete_cache(f"profile:{user_id}")

    return {
        "message": "User details updated"
    }