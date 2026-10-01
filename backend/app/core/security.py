from passlib.context import CryptContext
from jose import jwt, JWTError
from app.core.config import settings
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.models.role import Role

# PASSWORD HASHING  

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(pwd:str):
    return pwd_context.hash(pwd)

def verify_password(plain_pwd, hashed_pwd):
    return pwd_context.verify(plain_pwd, hashed_pwd)

# JWT ACCESS TOKEN

Secret_key = settings.SECRET_KEY

Algorithm = settings.ALGORITHM

Access_token_expiry = settings.ACCESS_TOKEN_EXPIRY_MINUTES

Refresh_token_expiry = settings.REFRESH_TOKEN_EXPIRY_DAYS

def create_access_token(payload:dict):

    to_encode = payload.copy() 

    expiry = datetime.utcnow() + timedelta(minutes=Access_token_expiry)

    to_encode.update(
        {
            "exp": expiry,
            "type": "access"
        }
    )

    token = jwt.encode(
        to_encode,
        Secret_key,
        algorithm=Algorithm
    )

    return token 

def verify_token(token:str):

    try:
        payload = jwt.decode(
            token,
            Secret_key,
            algorithms=[Algorithm]
        )

        if payload["type"] =="access":

           return payload 

    except JWTError:
        return None 

# JWT REFRESH TOKEN 

def create_refresh_token(payload:dict):

    to_encode = payload.copy() 

    expiry = datetime.utcnow() + timedelta(minutes=Refresh_token_expiry)

    to_encode.update(
        {
            "exp": expiry,
            "type": "refresh"
        }
    )

    token = jwt.encode(
        to_encode,
        Secret_key,
        algorithm=Algorithm
    )

    return token 

def verify_refresh_token(token:str):

    try:
        payload = jwt.decode(
            token,
            Secret_key,
            algorithms=[Algorithm]
        )

        if payload["type"] =="refresh":

           return payload 

    except JWTError:
        return None 

# AUTHORIZATION        

security = HTTPBearer()

def get_current_user(
    db:Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials 

    payload = verify_token(token) 

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    email = payload.get("sub")

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
       raise HTTPException(status_code=401, detail="Not authenticated")     

    return user 

def verify_role(required_role:str):

    ROLE_PERMISSIONS = {
        "admin":        ["admin"],
        "developer":    ["admin","developer"],
        "tester":       ["admin", "developer", "tester"],
        "viewer":       ["admin", "developer", "tester","viewer"]
    }    

    allowed_roles = ROLE_PERMISSIONS.get(required_role)

    def role_checker(current_user:User = Depends(get_current_user)):

        if not allowed_roles:
            raise HTTPException(status_code=403, detail="Invalid permission")

        if current_user.role.name.lower() not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

        return current_user

    return role_checker
        