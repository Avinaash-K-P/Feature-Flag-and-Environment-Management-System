from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog
from app.utils.pagination import paginate

def create_audit_log(
    db:Session, 
    user_id:int, 
    action:str,
    entity_type:str,
    entity_id:int,
    old_value :dict | None = None,
    new_value :dict | None = None
 ):

    audit_log = AuditLog(
        user_id = user_id,
        action = action,
        entity_type = entity_type,
        entity_id = entity_id,
        old_value = old_value,
        new_value = new_value
    )
    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)

def get_all_audit_logs(
    db: Session,
    page: int = 1,
    limit: int = 10
):
    query = (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
    )

    return paginate(
        query,
        page=page,
        limit=limit
    )