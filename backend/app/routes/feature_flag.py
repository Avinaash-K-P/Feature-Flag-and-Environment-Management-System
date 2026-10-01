from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.security import verify_role
from app.db.database import get_db
from app.schemas.feature_flag import (
    FeatureFlagCreate,
    FeatureFlagUpdate,
    FeatureFlagResponse
)
from app.services.feature_flag_service import(
    create_feature_flag,
    get_feature_flags,
    get_feature_flag,
    update_feature_flag,
    delete_feature_flag
)


router = APIRouter(tags=["Feature Flag Managment"])

@router.post("/feature-flag", response_model=FeatureFlagResponse)
def add_feature_flag(
    payload:FeatureFlagCreate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return create_feature_flag(db=db, payload=payload, user_id=current_user.id)

@router.get("/feature-flag", response_model=list[FeatureFlagResponse])
def list_feature_flags(
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_feature_flags(db=db)

@router.get("/feature-flag/{id}", response_model=FeatureFlagResponse)
def view_feature_flag(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_feature_flag(db=db, feature_flag_id=id)

@router.put("/feature-flag/{id}", response_model=FeatureFlagResponse)
def edit_feature_flag(
    id:int,
    payload:FeatureFlagUpdate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return update_feature_flag(db=db, payload=payload ,feature_flag_id=id)

@router.delete("/feature-flag/{id}")
def remove_feature_flag(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("admin"))
):
    return delete_feature_flag(db=db, feature_flag_id=id)