"""
Testes do GET /dashboard.

Como o Postgres de teste é compartilhado (fixture de sessão) entre todos
os arquivos de teste, não dá pra assumir "banco vazio" aqui. Em vez
disso: cria um programa próprio (nunca tocado por outro teste), guarda
o estado do dashboard ANTES de jogar, e depois confere que os números
mudaram exatamente pelo que esperamos (comparação por diferença, não
por valor absoluto).
"""

import psycopg
from psycopg.rows import dict_row


def identify(client, nickname):
    return client.post("/players", json={"nickname": nickname}).json()


def start_match(client, player_id, program_id):
    return client.post("/matches", json={"player_id": player_id, "program_id": program_id}).json()


def answer(client, match_id, question_id, option_id):
    return client.post(
        f"/matches/{match_id}/answers",
        json={"question_id": question_id, "option_id": option_id},
    ).json()


def seed_tiny_program(postgres_url, code):
    """Programa com só 2 perguntas — suficiente pra controlar o cenário do dashboard."""
    with psycopg.connect(postgres_url, row_factory=dict_row, autocommit=True) as conn:
        program = conn.execute(
            """
            INSERT INTO public.programs (code, title, description)
            VALUES (%s, 'Programa Dashboard', 'Seed isolado pros testes de dashboard')
            RETURNING id
            """,
            (code,),
        ).fetchone()

        questions = {}
        for number in (1, 2):
            question = conn.execute(
                """
                INSERT INTO public.questions (program_id, question_number, prompt)
                VALUES (%s, %s, %s)
                RETURNING id
                """,
                (program["id"], number, f"Pergunta dashboard {number}?"),
            ).fetchone()

            options = {}
            for opt_code, is_correct in [("A", False), ("B", True), ("C", False), ("D", False)]:
                option = conn.execute(
                    """
                    INSERT INTO public.question_options
                        (question_id, option_code, option_text, is_correct)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id
                    """,
                    (question["id"], opt_code, f"Alternativa {opt_code}", is_correct),
                ).fetchone()
                options[opt_code] = option["id"]

            questions[number] = {"id": question["id"], "options": options}

    return {"program_id": program["id"], "questions": questions}


def test_dashboard_reflete_partidas_finalizadas(client, postgres_url):
    program = seed_tiny_program(postgres_url, "DASH-TEST")
    q1, q2 = program["questions"][1], program["questions"][2]

    baseline = client.get("/dashboard").json()
    assert len(baseline["score_distribution"]) == 6

    # Jogador A: acerta as duas de primeira -> score 6, sem erros.
    player_a = identify(client, "Jogador Dashboard A")
    match_a = start_match(client, player_a["id"], program["program_id"])
    answer(client, match_a["id"], q1["id"], q1["options"]["B"])
    answer(client, match_a["id"], q2["id"], q2["options"]["B"])

    # Jogador B: erra a pergunta 1 todas as 3 vezes, acerta a 2 na 2a tentativa -> score 2.
    player_b = identify(client, "Jogador Dashboard B")
    match_b = start_match(client, player_b["id"], program["program_id"])
    answer(client, match_b["id"], q1["id"], q1["options"]["A"])
    answer(client, match_b["id"], q1["id"], q1["options"]["C"])
    answer(client, match_b["id"], q1["id"], q1["options"]["D"])
    answer(client, match_b["id"], q2["id"], q2["options"]["A"])
    answer(client, match_b["id"], q2["id"], q2["options"]["B"])

    after = client.get("/dashboard").json()

    assert after["total_matches"] == baseline["total_matches"] + 2
    assert after["total_players"] == baseline["total_players"] + 2
    assert after["first_attempt_hits"] == baseline["first_attempt_hits"] + 2
    assert after["second_attempt_hits"] == baseline["second_attempt_hits"] + 1
    assert after["third_attempt_hits"] == baseline["third_attempt_hits"] + 0
    assert after["missed_count"] == baseline["missed_count"] + 1
    assert after["best_score"] >= 6

    baseline_bucket = {b["label"]: b["total"] for b in baseline["score_distribution"]}
    after_bucket = {b["label"]: b["total"] for b in after["score_distribution"]}
    # score 6 e score 2 caem os dois no bucket "0-15"
    assert after_bucket["0-15"] == baseline_bucket["0-15"] + 2

    dashboard_hard_questions = [
        h for h in after["hardest_questions"] if h["program_title"] == "Programa Dashboard"
    ]
    assert dashboard_hard_questions, "pergunta do programa de teste deveria aparecer entre as mais dificeis"
    assert dashboard_hard_questions[0]["prompt"] == "Pergunta dashboard 1?"
    assert dashboard_hard_questions[0]["miss_rate"] == 50.0

    baseline_len = len(baseline["score_evolution"])
    evolution = after["score_evolution"]
    assert evolution[-1]["score"] == 2
    assert evolution[-1]["nickname"] == "Jogador Dashboard B"
    if baseline_len + 2 <= 15:
        assert evolution[baseline_len]["score"] == 6
        assert evolution[baseline_len]["nickname"] == "Jogador Dashboard A"


def test_dashboard_score_distribution_sempre_tem_seis_faixas(client):
    response = client.get("/dashboard")
    assert response.status_code == 200
    labels = [b["label"] for b in response.json()["score_distribution"]]
    assert labels == ["0-15", "16-30", "31-45", "46-60", "61-75", "76-90"]
