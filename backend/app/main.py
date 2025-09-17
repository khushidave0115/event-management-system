from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routes import users, events

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Event Management API (Fixed)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/auth", tags=["auth"])
app.include_router(events.router, prefix="/events", tags=["events"])
