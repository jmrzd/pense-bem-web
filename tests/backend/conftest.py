"""
Infraestrutura compartilhada dos testes do backend.

A ideia central: os testes rodam contra um Postgres DE VERDADE (não um
mock, não SQLite), criado sob demanda pelo pacote `pgserver` — que baixa
e roda um binário do Postgres sem precisar de Docker nem de instalação
manual. Isso importa porque várias regras do jogo (nickname único
ignorando maiúsculas/minúsculas, no máximo 1 alternativa correta por
pergunta, score entre 0 e 90 etc.) são garantidas por CONSTRAINTS do
próprio `database/schema.sql`, e um mock não pegaria uma violação dessas.
"""

import os
import sys
from pathlib import Path

import pytest

# tests/backend/conftest.py -> tests/backend -> tests -> raiz do repo
REPO_ROOT = Path(__file__).resolve().parents[2]
BACKEND_DIR = REPO_ROOT / "backend"
SCHEMA_PATH = REPO_ROOT / "database" / "schema.sql"

# O pacote da API (`app`) só existe dentro de backend/, então precisamos
# adicioná-lo ao sys.path para poder fazer `from app.main import app`
# independente de onde o pytest for executado.
sys.path.insert(0, str(BACKEND_DIR))


@pytest.fixture(scope="session")
def postgres_url(tmp_path_factory):
    """Sobe um Postgres temporário e aplica o schema.sql oficial do projeto."""
    import pgserver

    pgdata = tmp_path_factory.mktemp("pgdata")
    server = pgserver.get_server(pgdata)
    server.psql(SCHEMA_PATH.read_text(encoding="utf-8"))

    yield server.get_uri()

    server.cleanup()


@pytest.fixture(scope="session")
def client(postgres_url):
    """
    Cliente HTTP de teste ligado à API real (FastAPI TestClient), já
    apontando para o Postgres temporário via DATABASE_URL.

    As variáveis de ambiente precisam ser definidas ANTES do primeiro
    `import app...`, porque app/core/config.py lê o .env/ambiente uma
    única vez, no import do módulo (settings = Settings()).
    """
    os.environ["DATABASE_URL"] = postgres_url
    os.environ.setdefault("APP_ENV", "test")
    os.environ.setdefault("APP_DEBUG", "true")
    os.environ.setdefault("FRONTEND_URL", "http://localhost:5173")

    from fastapi.testclient import TestClient

    from app.main import app

    # "with" aciona o lifespan do FastAPI (abre/fecha o pool de conexões).
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="session")
def seeded_program(postgres_url, client):
    """
    Cria 1 programa com as 30 perguntas obrigatórias (regra fixa do jogo:
    cada programa tem exatamente 30 perguntas numeradas de 1 a 30), cada
    uma com 4 alternativas (A-D) e a alternativa B sempre marcada como
    correta — isso deixa os testes previsíveis: "responder B" = acertar,
    "responder A/C/D" = errar.

    Popula direto no banco (não pela API) porque a API é só leitura para
    perguntas — não existe endpoint de cadastro de conteúdo.
    """
    import psycopg
    from psycopg.rows import dict_row

    with psycopg.connect(postgres_url, row_factory=dict_row, autocommit=True) as conn:
        program = conn.execute(
            """
            INSERT INTO public.programs (code, title, description)
            VALUES ('TESTE', 'Programa de Teste', 'Seed usado pela suíte automatizada')
            RETURNING id
            """
        ).fetchone()
        program_id = program["id"]

        questions = {}
        for number in range(1, 31):
            question = conn.execute(
                """
                INSERT INTO public.questions (program_id, question_number, prompt)
                VALUES (%s, %s, %s)
                RETURNING id
                """,
                (program_id, number, f"Pergunta {number}?"),
            ).fetchone()
            question_id = question["id"]

            options = {}
            for code, is_correct in [("A", False), ("B", True), ("C", False), ("D", False)]:
                option = conn.execute(
                    """
                    INSERT INTO public.question_options
                        (question_id, option_code, option_text, is_correct)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id
                    """,
                    (question_id, code, f"Alternativa {code}", is_correct),
                ).fetchone()
                options[code] = option["id"]

            questions[number] = {"id": question_id, "options": options}

    return {"program_id": program_id, "questions": questions}
