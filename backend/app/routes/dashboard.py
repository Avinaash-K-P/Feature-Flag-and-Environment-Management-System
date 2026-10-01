from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.security import verify_role
from app.db.database import get_db
from app.services.dashboard_service import (
    get_all_feature_usage,
    get_feature_usage,
    get_dashboard_summary
)

router = APIRouter(tags=["Dashboard Analytics"])

@router.get("/dashboard-summary")
def view_dashboard_summary(
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_dashboard_summary(db=db) 

@router.get("/feature_usage")
def list_feature_usages(
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_all_feature_usage(db=db)

@router.get("/feature_usage/{feature_flag_id}")
def view_feature_usage(
    feature_flag_id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_feature_usage(db=db, feature_flag_id=feature_flag_id)