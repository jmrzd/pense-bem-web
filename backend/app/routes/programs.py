from fastapi import APIRouter, Depends
from psycopg import Connection

from app.core.database import get_db
from app.schemas.program import ProgramOut
from app.schemas.question import QuestionOut
from app.services import program_service

router = APIRouter(prefix="/programs", tags=["programs"])


@router.get("", response_model=list[ProgramOut])
def list_programs(conn: Connection = Depends(get_db)):
    """Programas disponíveis pra jogar (só os ativos)."""
    return program_service.list_programs(conn)


@router.get("/{program_id}/questions", response_model=list[QuestionOut])
def list_questions(program_id: int, conn: Connection = Depends(get_db)):
    """As 30 perguntas do programa, sem revelar qual alternativa é a correta."""
    return program_service.get_program_questions(conn, program_id)
