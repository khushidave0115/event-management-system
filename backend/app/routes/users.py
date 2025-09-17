
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, database, auth
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/signup", response_model=schemas.UserOut)
def signup(user_in: schemas.UserCreate, db: Session = Depends(database.SessionLocal)):
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = auth.get_password_hash(user_in.password)
    db_user = models.User(name=user_in.name, email=user_in.email, password=hashed, role=user_in.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.SessionLocal)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = auth.create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer", "user": user}
