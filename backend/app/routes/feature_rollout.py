from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_role
from app.schemas.feature_rollout import (
    FeatureRolloutCreate,
    FeatureRolloutUpdate,
    FeatureRolloutResponse
)
from app.services.feature_rollout_service import (
    create_feature_rollout,
    get_feature_rollouts,
    get_feature_rollout,
    update_feature_rollout,
    delete_feature_rollout
)

router = APIRouter(tags=["Feature Rollout Management"])

@router.post("/feature-rollout")
def add_feature_rollout(
    payload:FeatureRolloutCreate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return create_feature_rollout(db=db, payload=payload)

@router.get("/feature-rollout")
def list_feature_rollouts(
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_feature_rollouts(db=db)

@router.get("/feature-rollout/{id}", response_model=FeatureRolloutResponse)
def view_feature_rollouts(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_feature_rollout(db=db, feature_rollout_id=id)

@router.put("/feature-rollout/{id}", response_model=FeatureRolloutResponse)
def update_feature_rollouts(
    id:int,
    payload:FeatureRolloutUpdate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return update_feature_rollout(db=db, payload=payload,feature_rollout_id=id)

@router.delete("/feature-rollout/{id}")
def remove_feature_rollouts(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("admin"))
):
    return delete_feature_rollout(db=db, feature_rollout_id=id)