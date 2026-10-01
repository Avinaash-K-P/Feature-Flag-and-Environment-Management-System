from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.feature_flag import FeatureFlag 
from app.schemas.feature_flag import FeatureFlagCreate, FeatureFlagUpdate
from datetime import datetime
from app.services.audit_log_service import create_audit_log
from app.utils.cache import get_cache, set_cache, delete_cache

def create_feature_flag(db:Session, payload:FeatureFlagCreate, user_id:int):

    feature_flag_exist = db.query(FeatureFlag).filter(
        FeatureFlag.name == payload.name
    ).first() 

    if feature_flag_exist:
        raise HTTPException(status_code=409, detail="Feature flag name already exist")

    feature_flag = FeatureFlag(
        name = payload.name,
        description = payload.description,
        flag_type = payload.flag_type,
        default_value = payload.default_value,
        is_active = payload.is_active,         
        created_by = user_id
    )

    db.add(feature_flag)
    db.commit()
    db.refresh(feature_flag)

    create_audit_log(
        db=db,
        user_id = user_id,
        action = "CREATED", 
        entity_type = "Feature Flag",
        entity_id = feature_flag.id # type: ignore
    )

    delete_cache("feature_flag:all")

    return feature_flag

def get_feature_flags(db:Session):

    cache_key = "feature_flag:all"
    
    # Check Redis first
    cached_profile = get_cache(cache_key)
    
    if cached_profile is not None:
        return cached_profile
    
    feature_flags = db.query(FeatureFlag).all()

    result = [
        {
            "id": feature.id,
            "name": feature.name,
            "description": feature.description,
            "flag_type": feature.flag_type,
            "default_value": feature.default_value,
            "is_active": feature.is_active,
            "created_by": feature.created_by,
            "created_at": feature.created_at,
            "updated_at": feature.updated_at
        }
        for feature in feature_flags
    ]

    id:int
    name:str
    description:str|None 
    flag_type:str
    default_value:str
    is_active:bool
    created_by:int
    created_at:datetime
    updated_at:datetime|None 

    set_cache(
        cache_key,
        result,
        expire=300
    )

    return feature_flags

def get_feature_flag(db:Session, feature_flag_id:int):

    feature_flag = db.query(FeatureFlag).filter(
        FeatureFlag.id == feature_flag_id
    ).first()

    if not feature_flag:
        raise HTTPException(status_code=404,  detail="Feature flag not found")

    return feature_flag

def update_feature_flag(db:Session, payload:FeatureFlagUpdate, feature_flag_id:int):

    feature_flag = get_feature_flag(db, feature_flag_id)

    feature_flag.name = payload.name #type:ignore
    feature_flag.description = payload.description #type:ignore
    feature_flag.flag_type = payload.flag_type #type:ignore
    feature_flag.default_value = payload.default_value #type:ignore
    feature_flag.is_active = payload.is_active #type:ignore
    feature_flag.updated_at = datetime.utcnow() #type:ignore

    db.commit()
    db.refresh(feature_flag)

    delete_cache("feature_flag:all")

    return feature_flag

def delete_feature_flag(db:Session, feature_flag_id:int):

    feature_flag = get_feature_flag(db, feature_flag_id)

    db.delete(feature_flag)
    db.commit()
    delete_cache("feature_flag:all")

    return {"message":f"Feature flag {feature_flag.name} is deleted"}


