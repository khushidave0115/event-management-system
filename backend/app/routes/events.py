
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, database, auth

router = APIRouter()

@router.get("", response_model=list[schemas.Event])
def list_events(db: Session = Depends(database.SessionLocal)):
    return db.query(models.Event).all()

@router.post("", response_model=schemas.Event)
def create_event(event_in: schemas.EventCreate, db: Session = Depends(database.SessionLocal), user: models.User = Depends(auth.require_admin)):
    ev = models.Event(**event_in.dict())
    db.add(ev)
    db.commit()
    db.refresh(ev)
    return ev

@router.get("/{event_id}", response_model=schemas.Event)
def get_event(event_id: int, db: Session = Depends(database.SessionLocal)):
    ev = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found")
    return ev

@router.put("/{event_id}", response_model=schemas.Event)
def update_event(event_id: int, event_in: schemas.EventCreate, db: Session = Depends(database.SessionLocal), user: models.User = Depends(auth.require_admin)):
    ev = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found")
    for k, v in event_in.dict().items():
        setattr(ev, k, v)
    db.commit()
    db.refresh(ev)
    return ev

@router.delete("/{event_id}", status_code=204)
def delete_event(event_id: int, db: Session = Depends(database.SessionLocal), user: models.User = Depends(auth.require_admin)):
    ev = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(ev)
    db.commit()
    return
