from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.security import verify_role
from app.db.database import get_db
from app.schemas.environment import (
    EnvironmentCreate,
    EnvironmentUpdate,
    EnvironmentResponse
)
from app.services.environment_service import (
    create_environment,
    get_environments,
    get_environment,
    update_environment,
    delete_environment
)

router = APIRouter(tags=["Environment Management"])

@router.post("/environment", response_model=EnvironmentResponse)
def add_environment(
    payload:EnvironmentCreate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return create_environment(db=db, payload=payload, user_id=current_user.id)

@router.get("/environment")
def list_environments(
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_environments(db=db)

@router.get("/environment/{id}")
def view_environment(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return get_environment(db=db, environment_id=id)

@router.put("/environment/{id}", response_model=EnvironmentResponse)
def edit_environment(
    id:int,
    payload:EnvironmentUpdate,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return update_environment(db=db, payload=payload, environment_id=id)

@router.delete("/environment/{id}")
def remove_environment(
    id:int,
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("viewer"))
):
    return delete_environment(db=db, environment_id=id)