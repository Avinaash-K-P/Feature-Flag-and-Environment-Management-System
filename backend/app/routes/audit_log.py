from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.audit_log import AuditLogResponse
from app.services.audit_log_service import get_all_audit_logs
from app.core.security import verify_role


router = APIRouter(
    prefix="/audit-logs",
    tags=["Audit Logs"]
)

@router.get("")
def get_audit_logs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user=Depends(verify_role("admin"))
):
    return get_all_audit_logs(
        db=db,
        page=page,
        limit=limit
    )