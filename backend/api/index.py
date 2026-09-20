from fastapi import FastAPI
from app.main import app as original_app

app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok", "env": "production"}

app.mount("/api", original_app)