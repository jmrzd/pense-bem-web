from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import pool
from app.routes import matches, players, programs, ranking


@asynccontextmanager
async def lifespan(app: FastAPI):
    pool.open()
    yield
    pool.close()


app = FastAPI(title="Pense Bem Web API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(players.router)
app.include_router(programs.router)
app.include_router(matches.router)
app.include_router(ranking.router)


@app.get("/health")
def health_check():
    return {"status": "ok", "env": settings.app_env}
