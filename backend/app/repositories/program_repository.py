"""Acesso direto à tabela public.programs."""

from psycopg import Connection


def list_active(conn: Connection) -> list[dict]:
    """Só programas ativos aparecem pro jogador escolher — desativado não some do banco."""
    cur = conn.execute(
        "SELECT * FROM public.programs WHERE active = TRUE ORDER BY id"
    )
    return cur.fetchall()


def get_by_id(conn: Connection, program_id: int) -> dict | None:
    cur = conn.execute(
        "SELECT * FROM public.programs WHERE id = %s", (program_id,)
    )
    return cur.fetchone()
