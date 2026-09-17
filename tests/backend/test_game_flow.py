"""
Testes de integração do backend (API -> regras de negócio -> Postgres).

Cobrem os "Cenários essenciais" descritos em tests/README.md:

    Cenário 1 - 30 acertos na 1a tentativa            -> 90 pontos
    Cenário 2 - acerto na 2a tentativa                 -> 2 pontos
    Cenário 3 - acerto na 3a tentativa                 -> 1 ponto
    Cenário 4 - 3 erros seguidos                       -> 0 pontos, segue pro próximo
    Cenário 5 - 4a tentativa                           -> bloqueada
    Cenário 6 - pergunta 30 concluída                  -> partida finalizada

mais os casos de erro que o README do backend pede para validar
(pergunta/partida/opção inexistente ou inválida, partida já finalizada,
pergunta de outro programa).
"""

QUESTION_1 = 1
QUESTION_2 = 2


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


def test_identify_player_is_idempotent_and_case_insensitive(client):
    """Mesmo apelido (ignorando maiúsculas/espaços) sempre volta o mesmo player."""
    first = identify(client, "Gelado")
    second = identify(client, "  gelado  ")
    assert first["id"] == second["id"]


def test_list_programs_and_questions(client, seeded_program):
    programs = client.get("/programs").json()
    assert any(p["id"] == seeded_program["program_id"] for p in programs)

    questions = client.get(f"/programs/{seeded_program['program_id']}/questions").json()
    assert len(questions) == 30
    # a alternativa correta nunca deve vazar pro cliente
    assert "is_correct" not in questions[0]["options"][0]


def test_cenario_1_pontuacao_maxima_90_pontos(client, seeded_program):
    """30 perguntas, acerto de primeira em todas -> 90 pontos e partida finalizada."""
    player = identify(client, "Jogador Perfeito")
    match = start_match(client, player["id"], seeded_program["program_id"])

    last_result = None
    for number in range(1, 31):
        question = seeded_program["questions"][number]
        response = answer(client, match["id"], question["id"], question["options"]["B"])
        assert response.status_code == 200, response.text
        last_result = response.json()
        assert last_result["correct"] is True
        assert last_result["attempt_number"] == 1
        assert last_result["points_awarded"] == 3

    assert last_result["current_score"] == 90
    assert last_result["match_finished"] is True

    match_state = client.get(f"/matches/{match['id']}").json()
    assert match_state["status"] == "finished"
    assert match_state["score"] == 90


def test_cenario_2_acerto_segunda_tentativa_vale_2_pontos(client, seeded_program):
    player = identify(client, "Jogador Segunda Tentativa")
    match = start_match(client, player["id"], seeded_program["program_id"])
    question = seeded_program["questions"][QUESTION_1]

    wrong = answer(client, match["id"], question["id"], question["options"]["A"])
    assert wrong.json() == {
        "attempt_number": 1,
        "correct": False,
        "points_awarded": 0,
        "current_score": 0,
        "question_finished": False,
        "match_finished": False,
    }

    right = answer(client, match["id"], question["id"], question["options"]["B"])
    result = right.json()
    assert result["attempt_number"] == 2
    assert result["correct"] is True
    assert result["points_awarded"] == 2
    assert result["current_score"] == 2
    assert result["question_finished"] is True


def test_cenario_3_acerto_terceira_tentativa_vale_1_ponto(client, seeded_program):
    player = identify(client, "Jogador Terceira Tentativa")
    match = start_match(client, player["id"], seeded_program["program_id"])
    question = seeded_program["questions"][QUESTION_1]

    answer(client, match["id"], question["id"], question["options"]["A"])
    answer(client, match["id"], question["id"], question["options"]["C"])
    result = answer(client, match["id"], question["id"], question["options"]["B"]).json()

    assert result["attempt_number"] == 3
    assert result["points_awarded"] == 1
    assert result["current_score"] == 1


def test_cenario_4_tres_erros_zera_pontos_e_libera_proxima_pergunta(client, seeded_program):
    player = identify(client, "Jogador Zero Pontos")
    match = start_match(client, player["id"], seeded_program["program_id"])
    question = seeded_program["questions"][QUESTION_1]

    answer(client, match["id"], question["id"], question["options"]["A"])
    answer(client, match["id"], question["id"], question["options"]["C"])
    third = answer(client, match["id"], question["id"], question["options"]["D"]).json()

    assert third["correct"] is False
    assert third["points_awarded"] == 0
    assert third["current_score"] == 0
    assert third["question_finished"] is True  # esgotou as tentativas, libera a próxima

    next_question = seeded_program["questions"][QUESTION_2]
    next_result = answer(client, match["id"], next_question["id"], next_question["options"]["B"])
    assert next_result.status_code == 200


def test_cenario_5_quarta_tentativa_e_bloqueada(client, seeded_program):
    player = identify(client, "Jogador Quarta Tentativa")
    match = start_match(client, player["id"], seeded_program["program_id"])
    question = seeded_program["questions"][QUESTION_1]

    answer(client, match["id"], question["id"], question["options"]["A"])
    answer(client, match["id"], question["id"], question["options"]["C"])
    answer(client, match["id"], question["id"], question["options"]["D"])

    fourth = answer(client, match["id"], question["id"], question["options"]["B"])
    assert fourth.status_code == 400


def test_responder_pergunta_ja_resolvida_e_bloqueado(client, seeded_program):
    player = identify(client, "Jogador Pergunta Resolvida")
    match = start_match(client, player["id"], seeded_program["program_id"])
    question = seeded_program["questions"][QUESTION_1]

    ok = answer(client, match["id"], question["id"], question["options"]["B"])
    assert ok.status_code == 200

    again = answer(client, match["id"], question["id"], question["options"]["A"])
    assert again.status_code == 400


def test_opcao_invalida_e_rejeitada(client, seeded_program):
    player = identify(client, "Jogador Opcao Invalida")
    match = start_match(client, player["id"], seeded_program["program_id"])
    question = seeded_program["questions"][QUESTION_1]

    response = answer(client, match["id"], question["id"], option_id=999999)
    assert response.status_code == 400


def test_pergunta_de_outro_programa_e_rejeitada(client, postgres_url, seeded_program):
    import psycopg
    from psycopg.rows import dict_row

    # cria um segundo programa com 1 pergunta só pra este teste
    with psycopg.connect(postgres_url, row_factory=dict_row, autocommit=True) as conn:
        other_program = conn.execute(
            """
            INSERT INTO public.programs (code, title, description)
            VALUES ('OUTRO', 'Outro Programa', 'Seed para teste de isolamento entre programas')
            RETURNING id
            """
        ).fetchone()

        other_question = conn.execute(
            """
            INSERT INTO public.questions (program_id, question_number, prompt)
            VALUES (%s, 1, 'Pergunta de outro programa?')
            RETURNING id
            """,
            (other_program["id"],),
        ).fetchone()

        other_option = conn.execute(
            """
            INSERT INTO public.question_options
                (question_id, option_code, option_text, is_correct)
            VALUES (%s, 'A', 'Alternativa A', true)
            RETURNING id
            """,
            (other_question["id"],),
        ).fetchone()

    player = identify(client, "Jogador Programa Errado")
    match = start_match(client, player["id"], seeded_program["program_id"])

    response = answer(client, match["id"], other_question["id"], other_option["id"])
    assert response.status_code == 400
