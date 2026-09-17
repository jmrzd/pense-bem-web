from psycopg import Connection

from app.repositories import player_repository


def identify_player(conn: Connection, nickname: str) -> dict:
    trimmed = nickname.strip()
    existing = player_repository.find_by_nickname(conn, trimmed)
    if existing:
        return existing
    return player_repository.create(conn, trimmed)
