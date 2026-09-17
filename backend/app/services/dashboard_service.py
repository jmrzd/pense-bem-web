from psycopg import Connection

from app.repositories import dashboard_repository


def get_dashboard_stats(conn: Connection) -> dict:
    """Monta os indicadores/gráficos do dashboard a partir de partidas finalizadas.

    Sem nenhuma partida finalizada ainda, volta com os totais zerados e
    listas vazias em vez de erro — é o estado inicial normal do jogo.
    """
    totals = dashboard_repository.get_totals(conn)
    most_active = dashboard_repository.get_most_active_player(conn)
    attempt_breakdown = dashboard_repository.get_attempt_breakdown(conn)
    resolved_summary = dashboard_repository.get_resolved_questions_summary(conn)

    total_resolved = resolved_summary["total_resolved"]
    total_correct = resolved_summary["total_correct"]
    accuracy_rate = round(100 * total_correct / total_resolved) if total_resolved else 0
    missed_count = total_resolved - total_correct

    chronological_matches = dashboard_repository.list_finished_matches_chronological(conn)
    last_matches = chronological_matches[-15:]
    score_evolution = [
        {"match_label": f"#{index + 1}", "score": m["score"], "nickname": m["nickname"]}
        for index, m in enumerate(last_matches)
    ]

    return {
        "total_players": totals["total_players"],
        "total_matches": totals["total_matches"],
        "average_score": float(totals["average_score"]),
        "accuracy_rate": accuracy_rate,
        "best_score": totals["best_score"],
        "best_score_nickname": dashboard_repository.get_best_score_nickname(conn) or "—",
        "most_active_player": most_active["nickname"] if most_active else "—",
        "most_active_player_matches": most_active["total_matches"] if most_active else 0,
        "first_attempt_hits": attempt_breakdown[1],
        "second_attempt_hits": attempt_breakdown[2],
        "third_attempt_hits": attempt_breakdown[3],
        "missed_count": missed_count,
        "hardest_questions": dashboard_repository.get_hardest_questions(conn),
        "score_evolution": score_evolution,
        "score_distribution": dashboard_repository.get_score_distribution(conn),
    }
