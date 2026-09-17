"""
Testes complementares: casos de erro (404/400) não cobertos pelo fluxo
principal do jogo e o endpoint de ranking.
"""

def identify(client, nickname):
    response = client.post("/players", json={"nickname": nickname})
    assert response.status_code == 200, response.text
    return response.json()


def start_match(client, player_id, program_id):
    response = client.post("/matches", json={"player_id": player_id, "program_id": program_id})
    assert response.status_code == 200, response.text
    return response.json()


def answer(client, match_id, question_id, option_id):
    return client.post(
        f"/matches/{match_id}/answers",
        json={"question_id": question_id, "option_id": option_id},
    )


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_iniciar_partida_com_jogador_inexistente_e_404(client, seeded_program):
    response = client.post(
        "/matches", json={"player_id": 999999, "program_id": seeded_program["program_id"]}
    )
    assert response.status_code == 404


def test_iniciar_partida_com_programa_inexistente_e_404(client):
    player = identify(client, "Jogador Programa Inexistente")
    response = client.post("/matches", json={"player_id": player["id"], "program_id": 999999})
    assert response.status_code == 404


def test_buscar_partida_inexistente_e_404(client):
    response = client.get("/matches/999999")
    assert response.status_code == 404


def test_listar_perguntas_de_programa_inexistente_e_404(client):
    response = client.get("/programs/999999/questions")
    assert response.status_code == 404


def test_responder_partida_inexistente_e_404(client, seeded_program):
    question = seeded_program["questions"][1]
    response = answer(client, 999999, question["id"], question["options"]["B"])
    assert response.status_code == 404


def test_responder_pergunta_inexistente_e_404(client, seeded_program):
    player = identify(client, "Jogador Pergunta Inexistente")
    match = start_match(client, player["id"], seeded_program["program_id"])
    response = answer(client, match["id"], 999999, option_id=1)
    assert response.status_code == 404


def test_responder_partida_ja_finalizada_e_400(client, seeded_program):
    player = identify(client, "Jogador Partida Finalizada")
    match = start_match(client, player["id"], seeded_program["program_id"])

    for number in range(1, 31):
        question = seeded_program["questions"][number]
        answer(client, match["id"], question["id"], question["options"]["B"])

    question = seeded_program["questions"][1]
    response = answer(client, match["id"], question["id"], question["options"]["B"])
    assert response.status_code == 400


def test_ranking_reflete_partidas_finalizadas(client, seeded_program):
    player = identify(client, "Jogador Ranking")
    match = start_match(client, player["id"], seeded_program["program_id"])

    for number in range(1, 31):
        question = seeded_program["questions"][number]
        answer(client, match["id"], question["id"], question["options"]["B"])

    ranking = client.get("/ranking").json()
    entry = next(item for item in ranking if item["player_id"] == player["id"])
    assert entry["best_score"] == 90
    assert entry["match_count"] >= 1
    assert entry["nickname"].lower() == "jogador ranking"
