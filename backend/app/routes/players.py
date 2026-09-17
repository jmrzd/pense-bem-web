from fastapi import APIRouter, Depends
from psycopg import Connection

from app.core.database import get_db
from app.schemas.player import PlayerCreate, PlayerOut
from app.services import player_service

router = APIRouter(prefix="/players", tags=["players"])


@router.post("", response_model=PlayerOut)
def identify_player(payload: PlayerCreate, conn: Connection = Depends(get_db)):
    """"Login" simples por nickname: cria o jogador na primeira vez, reaproveita depois."""
    return player_service.identify_player(conn, payload.nickname)
