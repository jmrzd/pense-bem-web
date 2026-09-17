"""Consultas agregadas para o dashboard (baseadas em database/queries/dashboard.sql).

Todas consideram só partidas finalizadas (status='finished') — uma
partida em andamento não deve inflar médias, ranking de mais ativo,
etc.
"""

from psycopg import Connection

SCORE_BUCKETS = [
    ("0-15", 0, 15),
    ("16-30", 16, 30),
    ("31-45", 31, 45),
    ("46-60", 46, 60),
    ("61-75", 61, 75),
    ("76-90", 76, 90),
]


def get_totals(conn: Connection) -> dict:
    return conn.execute(
        """
        SELECT
            COUNT(DISTINCT player_id) AS total_players,
            COUNT(*) AS total_matches,
            COALESCE(ROUND(AVG(score)::numeric, 1), 0) AS average_score,
            COALESCE(MAX(score), 0) AS best_score
        FROM public.matches
        WHERE status = 'finished'
        """
    ).fetchone()


def get_best_score_nickname(conn: Connection) -> str | None:
    row = conn.execute(
        """
        SELECT p.nickname
        FROM public.matches m
        JOIN public.players p ON p.id = m.player_id
        WHERE m.status = 'finished'
        ORDER BY m.score DESC, m.finished_at ASC
        LIMIT 1
        """
    ).fetchone()
    return row["nickname"] if row else None


def get_most_active_player(conn: Connection) -> dict | None:
    return conn.execute(
        """
        SELECT p.nickname, COUNT(*) AS total_matches
        FROM public.matches m
        JOIN public.players p ON p.id = m.player_id
        WHERE m.status = 'finished'
        GROUP BY p.id, p.nickname
        ORDER BY total_matches DESC, MAX(m.finished_at) DESC
        LIMIT 1
        """
    ).fetchone()


def get_attempt_breakdown(conn: Connection) -> dict:
    """Quantos acertos aconteceram em cada tentativa (1a/2a/3a), só de partidas finalizadas."""
    rows = conn.execute(
        """
        SELECT a.attempt_number, COUNT(*) AS total
        FROM public.attempts a
        JOIN public.matches m ON m.id = a.match_id
        WHERE m.status = 'finished' AND a.is_correct = TRUE
        GROUP BY a.attempt_number
        """
    ).fetchall()
    breakdown = {1: 0, 2: 0, 3: 0}
    for row in rows:
        breakdown[row["attempt_number"]] = row["total"]
    return breakdown


def get_resolved_questions_summary(conn: Connection) -> dict:
    """Total de perguntas "resolvidas" (acertou ou esgotou tentativas) e quantas foram acertadas."""
    row = conn.execute(
        """
        WITH resolved AS (
            SELECT a.match_id, a.question_id, BOOL_OR(a.is_correct) AS eventually_correct
            FROM public.attempts a
            JOIN public.matches m ON m.id = a.match_id
            WHERE m.status = 'finished'
            GROUP BY a.match_id, a.question_id
        )
        SELECT
            COUNT(*) AS total_resolved,
            COUNT(*) FILTER (WHERE eventually_correct) AS total_correct
        FROM resolved
        """
    ).fetchone()
    return row


def get_hardest_questions(conn: Connection, limit: int = 5) -> list[dict]:
    return conn.execute(
        """
        WITH resolved AS (
            SELECT a.match_id, a.question_id, BOOL_OR(a.is_correct) AS eventually_correct
            FROM public.attempts a
            JOIN public.matches m ON m.id = a.match_id
            WHERE m.status = 'finished'
            GROUP BY a.match_id, a.question_id
        )
        SELECT
            q.prompt,
            pr.title AS program_title,
            ROUND(
                100.0 * COUNT(*) FILTER (WHERE NOT r.eventually_correct) / COUNT(*),
                2
            ) AS miss_rate
        FROM resolved r
        JOIN public.questions q ON q.id = r.question_id
        JOIN public.programs pr ON pr.id = q.program_id
        GROUP BY q.id, q.prompt, pr.title
        ORDER BY miss_rate DESC, COUNT(*) DESC
        LIMIT %s
        """,
        (limit,),
    ).fetchall()


def list_finished_matches_chronological(conn: Connection) -> list[dict]:
    """Score + nickname de cada partida finalizada, da mais antiga pra mais nova."""
    return conn.execute(
        """
        SELECT m.score, p.nickname
        FROM public.matches m
        JOIN public.players p ON p.id = m.player_id
        WHERE m.status = 'finished'
        ORDER BY m.finished_at ASC, m.id ASC
        """
    ).fetchall()


def get_score_distribution(conn: Connection) -> list[dict]:
    rows = conn.execute(
        """
        SELECT
            CASE
                WHEN score BETWEEN 0 AND 15 THEN '0-15'
                WHEN score BETWEEN 16 AND 30 THEN '16-30'
                WHEN score BETWEEN 31 AND 45 THEN '31-45'
                WHEN score BETWEEN 46 AND 60 THEN '46-60'
                WHEN score BETWEEN 61 AND 75 THEN '61-75'
                ELSE '76-90'
            END AS label,
            COUNT(*) AS total
        FROM public.matches
        WHERE status = 'finished'
        GROUP BY 1
        """
    ).fetchall()
    totals_by_label = {row["label"]: row["total"] for row in rows}
    # sempre retorna os 6 buckets na ordem certa, mesmo os que nao tiverem partida nenhuma
    return [{"label": label, "total": totals_by_label.get(label, 0)} for label, _, _ in SCORE_BUCKETS]
