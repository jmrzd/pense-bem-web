from fastapi import APIRouter, Depends
from psycopg import Connection

from app.core.database import get_db
from app.schemas.attempt import AnswerCreate, AnswerResult
from app.schemas.match import MatchCreate, MatchOut
from app.services import answer_service, match_service

router = APIRouter(prefix="/matches", tags=["matches"])


@router.post("", response_model=MatchOut)
def start_match(payload: MatchCreate, conn: Connection = Depends(get_db)):
    """Inicia uma partida nova de um jogador num programa."""
    return match_service.start_match(conn, payload.player_id, payload.program_id)


@router.get("/{match_id}", response_model=MatchOut)
def get_match(match_id: int, conn: Connection = Depends(get_db)):
    """Estado atual da partida (score, status, etc.) — usado pra retomar o jogo."""
    return match_service.get_match(conn, match_id)


@router.post("/{match_id}/answers", response_model=AnswerResult)
def submit_answer(match_id: int, payload: AnswerCreate, conn: Connection = Depends(get_db)):
    """Envia uma tentativa de resposta; a regra de pontuação está em answer_service."""
    return answer_service.submit_answer(conn, match_id, payload.question_id, payload.option_id)
