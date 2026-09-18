from contextlib import asynccontextmanager
import hmac
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.core.config import settings
from app.core.database import pool
from app.routes import dashboard, matches, players, programs, ranking


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Abre o pool de conexões quando a API sobe e fecha quando ela desliga."""
    pool.open()
    yield
    pool.close()


app = FastAPI(
    title="Pense Bem Web API",
    lifespan=lifespan,
)


# Só os frontends configurados em FRONTEND_URL podem chamar a API pelo navegador.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in settings.frontend_url.split(",")
        if origin.strip()
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


class AdminCodeRequest(BaseModel):
    code: str


@app.post("/admin/verify")
def verify_admin_code(payload: AdminCodeRequest):
    """
    Valida o código da área administrativa no backend.

    O código verdadeiro fica somente no servidor através da
    variável de ambiente ADMIN_CODE.
    """
    admin_code = os.getenv("ADMIN_CODE")

    if not admin_code:
        raise HTTPException(
            status_code=503,
            detail="Código administrativo não configurado no servidor.",
        )

    authorized = hmac.compare_digest(
        payload.code,
        admin_code,
    )

    if not authorized:
        raise HTTPException(
            status_code=401,
            detail="Código incorreto.",
        )

    return {
        "authorized": True,
    }


@app.get("/health")
def health_check():
    """Usado por monitoramento/deploy pra saber se a API está de pé."""
    return {
        "status": "ok",
        "env": settings.app_env,
    }