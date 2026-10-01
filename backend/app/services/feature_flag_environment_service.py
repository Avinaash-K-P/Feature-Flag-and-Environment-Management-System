from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.feature_flag import FeatureFlag
from app.models.environment import Environment
from app.models.feature_flag_environment import FeatureFlagEnvironment
from app.schemas.feature_flag_environment import FeatureFlagEnvironmentCreate, FeatureFlagEnvironmentUpdate     
from datetime import datetime


def create_feature_flag_env(db:Session, payload: FeatureFlagEnvironmentCreate):

    # Check feature flag
    feature_flag = db.query(FeatureFlag).filter(
        FeatureFlag.id == payload.feature_flag_id
    ).first() 

    if not feature_flag:
        raise HTTPException(status_code=404, detail="Feature flag not found")

    # Check environment
    environment = db.query(Environment).filter(
        Environment.id == payload.environment_id
    ).first()

    if not environment:
        raise HTTPException(status_code=404, detail="Environment not found")

    # Check configuration exist

    configuration_exist = db.query(FeatureFlagEnvironment).filter(
        FeatureFlagEnvironment.feature_flag_id == payload.feature_flag_id,
        FeatureFlagEnvironment.environment_id == payload.environment_id
    ).first() 


    if configuration_exist:
        raise HTTPException(status_code=409, detail="Feature flag and environment configuration already exist")

    feature_flag_env = FeatureFlagEnvironment(
        feature_flag_id = payload.feature_flag_id,
        environment_id = payload.environment_id,
        value = payload.value,
        is_enabled = payload.is_enabled
    )

    db.add(feature_flag_env)
    db.commit()
    db.refresh(feature_flag_env)

    return feature_flag_env

def get_feature_flag_envs(db:Session):

    feature_flag_envs = db.query(FeatureFlagEnvironment).all()

    return feature_flag_envs

def get_feature_flag_env(db:Session, ffe_id:int):

    feature_flag_env = db.query(FeatureFlagEnvironment).filter(
        FeatureFlagEnvironment.id == ffe_id
    ).first()

    if not feature_flag_env:
        raise HTTPException(status_code=404, detail="Feature flag environment not found")   

    return feature_flag_env

def update_feature_flag_env(db:Session, payload:FeatureFlagEnvironmentUpdate, ffe_id:int):

    feature_flag_env = get_feature_flag_env(db, ffe_id)

    feature_flag_env.value = payload.value #type:ignore
    feature_flag_env.is_enabled = payload.is_enabled #type:ignore 
    feature_flag_env.updated_at = datetime.utcnow() #type:ignore

    db.commit()
    db.refresh(feature_flag_env)

    return feature_flag_env

def delete_feature_flag_env(db:Session, ffe_id:int):

    feature_flag_env = get_feature_flag_env(db, ffe_id)

    db.delete(feature_flag_env)
    db.commit()

    return {
        "message":f"Configuration of feature flag id: {feature_flag_env.feature_flag_id} and environment id: {feature_flag_env.environment_id} is removed"
    }
