from fastapi import HTTPException
from psycopg import Connection

from app.repositories import program_repository, question_repository


def list_programs(conn: Connection) -> list[dict]:
    return program_repository.list_active(conn)


def get_program_questions(
    conn: Connection,
    program_id: int
) -> list[dict]:
    """
    Monta as perguntas + alternativas de um programa
    para o cliente do jogo.

    Importante:
    - NÃO inclui is_correct na resposta;
    - inclui image_url quando a questão possuir imagem;
    - perguntas sem imagem retornam image_url = None.
    """

    program = program_repository.get_by_id(
        conn,
        program_id
    )

    if not program:
        raise HTTPException(
            status_code=404,
            detail="Programa não encontrado"
        )

    questions = question_repository.list_by_program(
        conn,
        program_id
    )

    result = []

    for question in questions:
        options = question_repository.list_options(
            conn,
            question["id"]
        )

        result.append(
            {
                "id": question["id"],
                "question_number": question["question_number"],
                "prompt": question["prompt"],

                # Imagem opcional da questão
                "image_url": question.get("image_url"),

                "options": [
                    {
                        "id": option["id"],
                        "option_code": option["option_code"],
                        "option_text": option["option_text"],
                    }
                    for option in options
                ],
            }
        )

    return result