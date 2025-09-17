
from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "normal"

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class EventBase(BaseModel):
    title: str
    description: str
    date: str
    time: str
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int
    created_at: Optional[str]
    updated_at: Optional[str]
    class Config:
        orm_mode = True
