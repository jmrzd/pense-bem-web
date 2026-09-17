from psycopg import Connection


def find_by_nickname(conn: Connection, nickname: str) -> dict | None:
    cur = conn.execute(
        "SELECT * FROM public.players WHERE LOWER(BTRIM(nickname)) = LOWER(BTRIM(%s))",
        (nickname,),
    )
    return cur.fetchone()


def create(conn: Connection, nickname: str) -> dict:
    cur = conn.execute(
        "INSERT INTO public.players (nickname) VALUES (%s) RETURNING *",
        (nickname,),
    )
    return cur.fetchone()


def get_by_id(conn: Connection, player_id: int) -> dict | None:
    cur = conn.execute(
        "SELECT * FROM public.players WHERE id = %s", (player_id,)
    )
    return cur.fetchone()
