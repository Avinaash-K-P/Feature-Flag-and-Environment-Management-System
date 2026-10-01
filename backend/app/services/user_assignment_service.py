from fastapi import HTTPException
from sqlalchemy.orm import Session 
from app.models.user_assignment import UserAssignment
from app.models.feature_flag import FeatureFlag
from app.models.environment import Environment
from app.schemas.user_assignment import UserAssignmentCreate, UserAssignmentUpdate 

def create_user_assignment(db:Session, payload:UserAssignmentCreate) :

    feature_flag_exist = db.query(FeatureFlag).filter(
        FeatureFlag.id == payload.feature_flag_id
    ).first()

    if not feature_flag_exist:
        raise HTTPException(status_code=404, detail="Feature flag not found")

    environment_exist = db.query(Environment).filter(
        Environment.id == payload.environment_id            
    ).first() 

    if not environment_exist:
        raise HTTPException(status_code=404, detail="Environment not found") 

    combination_exist = db.query(UserAssignment).filter(
        UserAssignment.feature_flag_id == payload.feature_flag_id,
        UserAssignment.environment_id == payload.environment_id 
    ).first()

    if combination_exist:
        raise HTTPException(status_code=409, detail="Feature flag and environment id already exist")

    user_assignment = UserAssignment(
        user_id = payload.user_id,
        feature_flag_id = payload.feature_flag_id,
        environment_id = payload.environment_id,
        is_enabled = payload.is_enabled
    )

    db.add(user_assignment)
    db.commit()
    db.refresh(user_assignment)

    return user_assignment

def get_user_assignments(db:Session):

    user_assignments = db.query(UserAssignment).all() 

    return user_assignments 

def get_user_assignment(db:Session, user_assignment_id:int):

    user_assignment = db.query(UserAssignment).filter(
        UserAssignment.id == user_assignment_id
    ).first()

    if not user_assignment:
        raise HTTPException(status_code=404, detail="User assignment is not found")

    return user_assignment 

def update_user_assignment(db:Session, payload:UserAssignmentUpdate, user_assignment_id:int):

    user_assignment = get_user_assignment(db, user_assignment_id)

    user_assignment.is_enabled = payload.is_enabled #type:ignore

    db.commit()
    db.refresh(user_assignment)

    return user_assignment

def delete_user_assignment(db:Session, user_assignment_id:int):

    user_assignment = get_user_assignment(db, user_assignment_id)

    db.delete(user_assignment)
    db.commit()

    return {
        "message":f"User assignment id: {user_assignment.id} is deleted"
    }