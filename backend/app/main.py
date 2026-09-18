from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import pool
from app.routes import dashboard, matches, players, programs, ranking


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Abre o pool de conexões quando a API sobe e fecha quando ela desliga."""
    pool.open()
    yield
    pool.close()


app = FastAPI(title="Pense Bem Web API", lifespan=lifespan)

# Só o frontend configurado em FRONTEND_URL pode chamar a API pelo navegador.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    origin.strip()
    for origin in settings.frontend_url.split(",")
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(players.router)
app.include_router(programs.router)
app.include_router(matches.router)
app.include_router(ranking.router)
app.include_router(dashboard.router)


@app.get("/health")
def health_check():
    """Usado por monitoramento/deploy pra saber se a API está de pé."""
    return {"status": "ok", "env": settings.app_env}
