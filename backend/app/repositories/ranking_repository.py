from psycopg import Connection


def get_ranking(conn: Connection) -> list[dict]:
    cur = conn.execute(
        """
        SELECT
            p.id AS player_id,
            p.nickname,
            MAX(m.score) AS best_score,
            COUNT(m.id) AS match_count,
            MAX(m.finished_at) AS last_played_at
        FROM public.matches m
        JOIN public.players p ON p.id = m.player_id
        WHERE m.status = 'finished'
        GROUP BY p.id, p.nickname
        ORDER BY best_score DESC, last_played_at DESC
        """
    )
    return cur.fetchall()
