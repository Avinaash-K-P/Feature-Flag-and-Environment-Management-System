from fastapi import FastAPI
from app.routes import (
    auth,
    profile,
    role,
    user,
    feature_flag,
    environment,
    feature_flag_environment,
    feature_rollout,
    user_assignment,
    dashboard,
    audit_log
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Feature Flag & Environment Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(role.router)
app.include_router(user.router)
app.include_router(feature_flag.router)
app.include_router(environment.router)
app.include_router(feature_flag_environment.router)
app.include_router(feature_rollout.router)
app.include_router(user_assignment.router)
app.include_router(dashboard.router)
app.include_router(audit_log.router)

@app.get("/")
def read_root():
    return {"message":"Fastapi running successfully!"} 