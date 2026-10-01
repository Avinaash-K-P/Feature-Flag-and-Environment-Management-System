from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.security import verify_role
from app.db.database import get_db
from app.schemas.feature_flag_environment import (
    FeatureFlagEnvironmentCreate,
    FeatureFlagEnvironmentUpdate,
    FeatureFlagEnvironmentResponse
)
from app.services.feature_flag_environment_service import (
    create_feature_flag_env,
    get_feature_flag_envs,
    get_feature_flag_env,
    update_feature_flag_env,
    delete_feature_flag_env
)

router = APIRouter(tags=["Feature Flag Environment Confurigation"])

@router.post("/feature_flag_environment", response_model=FeatureFlagEnvironmentResponse)
def add_feature_flag_environment(
    payload:FeatureFlagEnvironmentCreate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return create_feature_flag_env(db=db, payload=payload)

@router.get("/feature_flag_environment", response_model=list[FeatureFlagEnvironmentResponse])
def list_feature_flag_environments(
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_feature_flag_envs(db=db)

@router.get("/feature_flag_environment/{id}", response_model=FeatureFlagEnvironmentResponse)
def view_feature_flag_environment(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_feature_flag_env(db=db, ffe_id=id)

@router.put("/feature_flag_environment/{id}", response_model=FeatureFlagEnvironmentResponse)
def edit_feature_flag_environment(
    id:int,
    payload:FeatureFlagEnvironmentUpdate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return update_feature_flag_env(db=db, payload=payload, ffe_id=id)

@router.delete("/feature_flag_environment/{id}")
def remove_feature_flag_environment(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("admin"))
):
    return delete_feature_flag_env(db=db, ffe_id=id)  