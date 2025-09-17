🎉 Event Management Project

An Event Management System built with **React (frontend)** and **FastAPI (backend)**.  
Designed to help manage events, users, and admin operations efficiently.  

---

⚡ Tech Stack
- Frontend: React (Create React App)  
- Backend: FastAPI (Python)  
- Database: SQLite (default) → Supports PostgreSQL via `DATABASE_URL`  
- Package Manager: npm / pip  



🚀 Quick Start

1️⃣ Backend Setup
bash
cd backend
python -m venv venv
Activate virtual environment
Linux/Mac
source venv/bin/activate
Windows
venv\Scripts\activate

Install dependencies
pip install -r requirements.txt

Start FastAPI server
uvicorn app.main:app --reload
