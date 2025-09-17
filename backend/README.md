
Backend setup (FastAPI)
1. python -m venv venv
2. source venv/bin/activate  # or venv\Scripts\activate on Windows
3. pip install -r requirements.txt
4. (Optional) set DATABASE_URL env var (default is sqlite ./test.db)
5. uvicorn app.main:app --reload
6. Visit http://127.0.0.1:8000/docs
