from psycopg import Connection


def list_by_program(conn: Connection, program_id: int) -> list[dict]:
    cur = conn.execute(
        """
        SELECT * FROM public.questions
        WHERE program_id = %s
        ORDER BY question_number
        """,
        (program_id,),
    )
    return cur.fetchall()


def get_by_id(conn: Connection, question_id: int) -> dict | None:
    cur = conn.execute(
        "SELECT * FROM public.questions WHERE id = %s", (question_id,)
    )
    return cur.fetchone()


def count_by_program(conn: Connection, program_id: int) -> int:
    cur = conn.execute(
        "SELECT COUNT(*) AS total FROM public.questions WHERE program_id = %s",
        (program_id,),
    )
    return cur.fetchone()["total"]


def list_options(conn: Connection, question_id: int) -> list[dict]:
    cur = conn.execute(
        """
        SELECT * FROM public.question_options
        WHERE question_id = %s
        ORDER BY option_code
        """,
        (question_id,),
    )
    return cur.fetchall()


def get_option_by_id(conn: Connection, option_id: int) -> dict | None:
    cur = conn.execute(
        "SELECT * FROM public.question_options WHERE id = %s", (option_id,)
    )
    return cur.fetchone()
