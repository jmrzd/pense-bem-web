"""Acesso direto à tabela public.attempts (histórico de tentativas de resposta)."""

from psycopg import Connection


def list_by_match_question(conn: Connection, match_id: int, question_id: int) -> list[dict]:
    cur = conn.execute(
        """
        SELECT * FROM public.attempts
        WHERE match_id = %s AND question_id = %s
        ORDER BY attempt_number
        """,
        (match_id, question_id),
    )
    return cur.fetchall()


def create(
    conn: Connection,
    match_id: int,
    question_id: int,
    selected_option_id: int,
    attempt_number: int,
    is_correct: bool,
    points_awarded: int,
) -> dict:
    cur = conn.execute(
        """
        INSERT INTO public.attempts (
            match_id, question_id, selected_option_id,
            attempt_number, is_correct, points_awarded
        )
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING *
        """,
        (match_id, question_id, selected_option_id, attempt_number, is_correct, points_awarded),
    )
    return cur.fetchone()


def count_finished_questions(conn: Connection, match_id: int) -> int:
    """Conta perguntas "resolvidas": acertou em alguma tentativa OU já gastou as 3.

    Usado pra saber se a partida acabou (resolvidas == total de perguntas do programa).
    """
    cur = conn.execute(
        """
        SELECT COUNT(*) AS total FROM (
            SELECT question_id
            FROM public.attempts
            WHERE match_id = %s
            GROUP BY question_id
            HAVING BOOL_OR(is_correct) OR COUNT(*) >= 3
        ) finished_questions
        """,
        (match_id,),
    )
    return cur.fetchone()["total"]
