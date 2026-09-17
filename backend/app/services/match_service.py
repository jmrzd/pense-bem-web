from fastapi import HTTPException
from psycopg import Connection

from app.repositories import match_repository, player_repository, program_repository


def start_match(conn: Connection, player_id: int, program_id: int) -> dict:
    player = player_repository.get_by_id(conn, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Jogador não encontrado")

    program = program_repository.get_by_id(conn, program_id)
    if not program or not program["active"]:
        raise HTTPException(status_code=404, detail="Programa não encontrado")

    return match_repository.create(conn, player_id, program_id)


def get_match(conn: Connection, match_id: int) -> dict:
    match = match_repository.get_by_id(conn, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Partida não encontrada")
    return match
