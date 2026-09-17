from psycopg import Connection

from app.repositories import ranking_repository


def get_ranking(conn: Connection) -> list[dict]:
    return ranking_repository.get_ranking(conn)
