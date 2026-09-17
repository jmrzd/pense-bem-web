from fastapi import HTTPException
from psycopg import Connection

from app.repositories import attempt_repository, match_repository, question_repository


def submit_answer(conn: Connection, match_id: int, question_id: int, option_id: int) -> dict:
    """Registra uma tentativa de resposta e calcula pontos, seguindo as regras do jogo:

    - até 3 tentativas por pergunta;
    - pontos por tentativa certa: 3 (1a), 2 (2a), 1 (3a); errar tudo = 0;
    - pergunta "termina" ao acertar ou ao esgotar as 3 tentativas, e nesse
      momento (e só nesse momento) a resposta inclui qual era a alternativa
      correta;
    - partida termina quando todas as perguntas do programa estiverem resolvidas.
    """
    match = match_repository.get_by_id(conn, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Partida não encontrada")
    if match["status"] == "finished":
        raise HTTPException(status_code=400, detail="Partida já finalizada")

    question = question_repository.get_by_id(conn, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Pergunta não encontrada")
    if question["program_id"] != match["program_id"]:
        raise HTTPException(status_code=400, detail="Pergunta pertence a outro programa")

    previous_attempts = attempt_repository.list_by_match_question(conn, match_id, question_id)
    already_solved = any(attempt["is_correct"] for attempt in previous_attempts)
    if already_solved or len(previous_attempts) >= 3:
        raise HTTPException(status_code=400, detail="Pergunta já concluída")

    option = question_repository.get_option_by_id(conn, option_id)
    if not option or option["question_id"] != question_id:
        raise HTTPException(status_code=400, detail="Alternativa inválida")

    attempt_number = len(previous_attempts) + 1
    is_correct = option["is_correct"]
    # 1a tentativa = 3 pontos, 2a = 2, 3a = 1; errando não pontua.
    points_awarded = (4 - attempt_number) if is_correct else 0

    attempt_repository.create(
        conn, match_id, question_id, option_id, attempt_number, is_correct, points_awarded
    )

    new_score = match["score"] + points_awarded
    match_repository.update_score(conn, match_id, new_score)

    question_finished = is_correct or attempt_number == 3

    total_questions = question_repository.count_by_program(conn, match["program_id"])
    finished_questions = attempt_repository.count_finished_questions(conn, match_id)
    match_finished = finished_questions >= total_questions

    if match_finished:
        match_repository.finish(conn, match_id)

    # Só revela a alternativa certa quando a pergunta já não pode mais
    # ser respondida (acertou ou esgotou as 3 tentativas) — é o que a UI
    # usa pra destacar a resposta certa depois do jogador errar tudo.
    correct_option_id = None
    if question_finished:
        options = question_repository.list_options(conn, question_id)
        correct_option_id = next(o["id"] for o in options if o["is_correct"])

    return {
        "attempt_number": attempt_number,
        "correct": is_correct,
        "points_awarded": points_awarded,
        "current_score": new_score,
        "question_finished": question_finished,
        "match_finished": match_finished,
        "correct_option_id": correct_option_id,
    }
