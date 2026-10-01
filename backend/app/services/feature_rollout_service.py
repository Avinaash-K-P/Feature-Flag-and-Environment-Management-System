from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.feature_rollout import FeatureRollout
from app.models.feature_flag_environment import FeatureFlagEnvironment
from app.schemas.feature_rollout import FeatureRolloutCreate, FeatureRolloutUpdate

def create_feature_rollout(db:Session, payload:FeatureRolloutCreate):

    feature_flag_env = db.query(FeatureFlagEnvironment).filter(
        FeatureFlagEnvironment.id == payload.feature_flag_environement_id
    ).first()

    if not feature_flag_env:
        raise HTTPException(status_code=404, detail= "Feature Flag Environment not found")

    rollout_exist = db.query(FeatureRollout).filter(
        FeatureRollout.feature_flag_environment_id == payload.feature_flag_environement_id
    ).first()

    if rollout_exist:
        HTTPException(status_code=409, detail="Rollout for this feature already exist")

    feature_rollout = FeatureRollout(
        feature_flag_environment_id = payload.feature_flag_environement_id,
        rollout_percentage = payload.rollout_percentage,
        is_active = payload.is_active
    )    

    db.add(feature_rollout)
    db.commit()
    db.refresh(feature_rollout)

    return feature_rollout 

def get_feature_rollouts(db:Session):

    feature_rollouts = db.query(FeatureRollout).all()

    return feature_rollouts

def get_feature_rollout(db:Session, feature_rollout_id:int):

    feature_rollout = db.query(FeatureRollout).filter(
        FeatureRollout.id == feature_rollout_id
    ).first()

    if not feature_rollout:
        raise HTTPException(status_code=404, detail="Feature rollout not found")

    return feature_rollout

def update_feature_rollout(db:Session, payload:FeatureRolloutUpdate, feature_rollout_id:int):

    feature_rollout = get_feature_rollout(db, feature_rollout_id)

    feature_rollout.rollout_percentage = payload.rollout_percentage #type:ignore
    feature_rollout.is_active = payload.is_active #type:ignore

    db.commit()
    db.refresh(feature_rollout)

    return feature_rollout

def delete_feature_rollout(db:Session, feature_rollout_id:int):

    feature_rollout = get_feature_rollout(db, feature_rollout_id)

    db.delete(feature_rollout)
    db.commit()

    return {"message": f"Feature rollout id: {feature_rollout.id} is deleted"}  
