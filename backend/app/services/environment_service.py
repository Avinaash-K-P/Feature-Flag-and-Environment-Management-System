from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.environment import Environment
from app.schemas.environment import EnvironmentCreate, EnvironmentUpdate
from datetime import datetime
from app.services.audit_log_service import create_audit_log
from app.utils.cache import get_cache, set_cache, delete_cache

def create_environment(db:Session, payload:EnvironmentCreate, user_id:int):

    environment_exist = db.query(Environment).filter(
        Environment.name == payload.name
    ).first()

    if environment_exist:
        raise HTTPException(status_code=409, detail="Environment already exist")

    environment = Environment(
        name = payload.name,
        description = payload.description,
        is_active = payload.is_active,
        created_by = user_id
    )

    db.add(environment)
    db.commit()
    db.refresh(environment)

    create_audit_log(
        db=db,
        user_id = user_id,
        action = "CREATED", 
        entity_type = "Environment",
        entity_id = environment.id # type: ignore
    )

    delete_cache("environment:all")

    return environment

def get_environments(db:Session):

    cache_key = "environment:all"
    
    # Check Redis first
    cached_profile = get_cache(cache_key)
    
    if cached_profile is not None:
        return cached_profile

    environments = db.query(Environment).all()

    result = [
        {
            "id": environment.id,
            "name": environment.name,
            "description": environment.description,
            "is_active": environment.is_active,
            "created_at": environment.created_at,
            "updated_at": environment.updated_at
        }
        for environment in environments
    ]

    # Store in Redis for 5 minutes
    set_cache(
        cache_key,
        result,
        expire=300
    )

    return result

def get_environment(db:Session, environment_id:int):

    environment = db.query(Environment).filter(
        Environment.id == environment_id
    ).first()

    if not environment:
        raise HTTPException(status_code=404, detail="Environment not found")

    return environment

def update_environment(db:Session, payload:EnvironmentUpdate, environment_id):

    environment = get_environment(db, environment_id)

    environment.name = payload.name #type:ignore
    environment.description = payload.description #type:ignore    
    environment.is_active = payload.is_active #type:ignore    
    environment.updated_at = datetime.utcnow() #type:ignore    

    db.commit()
    db.refresh(environment)

    delete_cache("environment:all")

    return environment

def delete_environment(db:Session, environment_id:int):

    environment = get_environment(db, environment_id)

    db.delete(environment)
    db.commit()

    delete_cache("environment:all")

    return {"message":f"Environment {environment.name} is deleted"}