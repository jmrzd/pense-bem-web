"""Acesso direto à tabela public.matches (sem regra de negócio aqui)."""

from psycopg import Connection


def create(conn: Connection, player_id: int, program_id: int) -> dict:
    cur = conn.execute(
        """
        INSERT INTO public.matches (player_id, program_id)
        VALUES (%s, %s)
        RETURNING *
        """,
        (player_id, program_id),
    )
    return cur.fetchone()


def get_by_id(conn: Connection, match_id: int) -> dict | None:
    cur = conn.execute(
        "SELECT * FROM public.matches WHERE id = %s", (match_id,)
    )
    return cur.fetchone()


def update_score(conn: Connection, match_id: int, score: int) -> dict:
    cur = conn.execute(
        "UPDATE public.matches SET score = %s WHERE id = %s RETURNING *",
        (score, match_id),
    )
    return cur.fetchone()


def finish(conn: Connection, match_id: int) -> dict:
    cur = conn.execute(
        """
        UPDATE public.matches
        SET status = 'finished', finished_at = NOW()
        WHERE id = %s
        RETURNING *
        """,
        (match_id,),
    )
    return cur.fetchone()
