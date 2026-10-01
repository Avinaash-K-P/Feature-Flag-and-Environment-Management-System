from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import verify_role
from app.schemas.user_assignment import (
    UserAssignmentCreate,
    UserAssignmentUpdate,
    UserAssignmentResponse
)
from app.services.user_assignment_service import (
    create_user_assignment,
    get_user_assignments,
    get_user_assignment,
    update_user_assignment,
    delete_user_assignment
)

router = APIRouter(tags=["User Assignment Management"])

@router.post("/user-assignment", response_model=UserAssignmentResponse)
def add_user_assignment(
    payload:UserAssignmentCreate,    
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return create_user_assignment(db=db, payload=payload)

@router.get("/user-assignment", response_model=list[UserAssignmentResponse])
def list_user_assignments(   
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("tester"))
):
    return get_user_assignments(db=db)

@router.get("/user-assignment/{id}", response_model=UserAssignmentResponse)
def view_user_assignments(   
    id:int,    
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("tester"))
):
    return get_user_assignment(db=db, user_assignment_id=id)

@router.patch("/user-assignment/{id}")
def edit_user_assignments(   
    id:int, 
    payload:UserAssignmentUpdate,    
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("developer"))
):
    return update_user_assignment(db=db, payload=payload, user_assignment_id=id)

@router.delete("/user-assignment/{id}")
def remove_user_assignments(   
    id:int,    
    db:Session = Depends(get_db),
    current_user = Depends(verify_role("admin"))
):
    return delete_user_assignment(db=db, user_assignment_id=id)

