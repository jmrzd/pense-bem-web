from fastapi import FastAPI
from app.main import app as backend_app

app = FastAPI()

app.mount("/api", backend_app)