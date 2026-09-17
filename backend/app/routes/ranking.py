from fastapi import APIRouter, Depends
from psycopg import Connection

from app.core.database import get_db
from app.schemas.ranking import RankingEntry
from app.services import ranking_service

router = APIRouter(prefix="/ranking", tags=["ranking"])


@router.get("", response_model=list[RankingEntry])
def get_ranking(conn: Connection = Depends(get_db)):
    """Placar geral: melhor pontuação de cada jogador em partidas finalizadas."""
    return ranking_service.get_ranking(conn)
