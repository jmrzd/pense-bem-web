-- ============================================================
-- PENSE BEM WEB
-- Database Schema
-- PostgreSQL / Supabase
--
-- Responsável principal:
-- João Miguel (Gelado) — Banco de Dados / SQL / Supabase
--
-- Estrutura principal:
-- players
-- programs
-- questions
-- question_options
-- matches
-- attempts
-- ============================================================


BEGIN;


-- ============================================================
-- 1. PLAYERS
-- ============================================================
-- Representa os jogadores do sistema.
--
-- Não existe login tradicional.
-- O jogador será identificado por nome/apelido.
-- O ID será utilizado internamente nos relacionamentos.
-- ============================================================

CREATE TABLE public.players (

    id BIGINT GENERATED ALWAYS AS IDENTITY,

    nickname VARCHAR(40) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_players
        PRIMARY KEY (id),

    CONSTRAINT ck_players_nickname
        CHECK (
            CHAR_LENGTH(BTRIM(nickname)) BETWEEN 1 AND 40
        )
);


-- Impede:
-- Gelado
-- gelado
-- GELADO
--
-- de serem cadastrados como jogadores diferentes.
CREATE UNIQUE INDEX uq_players_nickname_normalized
ON public.players (
    LOWER(BTRIM(nickname))
);



-- ============================================================
-- 2. PROGRAMS
-- ============================================================
-- Representa os programas/conjuntos de perguntas.
--
-- Cada programa poderá possuir até 30 perguntas,
-- numeradas de 1 até 30.
-- ============================================================

CREATE TABLE public.programs (

    id BIGINT GENERATED ALWAYS AS IDENTITY,

    code VARCHAR(20) NOT NULL,

    title VARCHAR(100) NOT NULL,

    description TEXT,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_programs
        PRIMARY KEY (id),

    CONSTRAINT uq_programs_code
        UNIQUE (code),

    CONSTRAINT ck_programs_code
        CHECK (
            CHAR_LENGTH(BTRIM(code)) > 0
        ),

    CONSTRAINT ck_programs_title
        CHECK (
            CHAR_LENGTH(BTRIM(title)) > 0
        )
);



-- ============================================================
-- 3. QUESTIONS
-- ============================================================
-- Representa as perguntas existentes em cada programa.
--
-- Cada pergunta:
--
-- pertence a um programa;
-- possui número entre 1 e 30;
-- possui seu próprio enunciado.
--
-- Um programa não pode possuir duas perguntas
-- com o mesmo número.
-- ============================================================

CREATE TABLE public.questions (

    id BIGINT GENERATED ALWAYS AS IDENTITY,

    program_id BIGINT NOT NULL,

    question_number SMALLINT NOT NULL,

    prompt TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_questions
        PRIMARY KEY (id),

    CONSTRAINT fk_questions_program
        FOREIGN KEY (program_id)
        REFERENCES public.programs(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_questions_program_number
        UNIQUE (
            program_id,
            question_number
        ),

    CONSTRAINT ck_questions_number
        CHECK (
            question_number BETWEEN 1 AND 30
        ),

    CONSTRAINT ck_questions_prompt
        CHECK (
            CHAR_LENGTH(BTRIM(prompt)) > 0
        )
);



-- ============================================================
-- 4. QUESTION OPTIONS
-- ============================================================
-- Representa as alternativas disponíveis para cada pergunta.
--
-- Padrão inicial:
--
-- A
-- B
-- C
-- D
--
-- is_correct define qual alternativa é correta.
-- ============================================================

CREATE TABLE public.question_options (

    id BIGINT GENERATED ALWAYS AS IDENTITY,

    question_id BIGINT NOT NULL,

    option_code CHAR(1) NOT NULL,

    option_text TEXT NOT NULL,

    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_question_options
        PRIMARY KEY (id),

    CONSTRAINT fk_question_options_question
        FOREIGN KEY (question_id)
        REFERENCES public.questions(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_question_options_code
        UNIQUE (
            question_id,
            option_code
        ),

    /*
        Essa constraint adicional permitirá que attempts
        confirme que a alternativa escolhida realmente
        pertence à pergunta respondida.
    */
    CONSTRAINT uq_question_options_question_id
        UNIQUE (
            question_id,
            id
        ),

    CONSTRAINT ck_question_options_code
        CHECK (
            option_code IN ('A', 'B', 'C', 'D')
        ),

    CONSTRAINT ck_question_options_text
        CHECK (
            CHAR_LENGTH(BTRIM(option_text)) > 0
        )
);


-- Garante que uma pergunta não tenha
-- MAIS DE UMA alternativa marcada como correta.
--
-- Exemplo proibido:
--
-- A = correta
-- B = correta
--
-- para a mesma pergunta.
CREATE UNIQUE INDEX uq_question_one_correct_option
ON public.question_options (question_id)
WHERE is_correct = TRUE;



-- ============================================================
-- 5. MATCHES
-- ============================================================
-- Representa cada partida realizada por um jogador.
--
-- Um jogador pode realizar várias partidas.
--
-- Uma partida pertence a:
--
-- 1 jogador
-- 1 programa
--
-- O score final varia de 0 até 90.
-- ============================================================

CREATE TABLE public.matches (

    id BIGINT GENERATED ALWAYS AS IDENTITY,

    player_id BIGINT NOT NULL,

    program_id BIGINT NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'in_progress',

    score SMALLINT NOT NULL DEFAULT 0,

    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    finished_at TIMESTAMPTZ,

    CONSTRAINT pk_matches
        PRIMARY KEY (id),

    CONSTRAINT fk_matches_player
        FOREIGN KEY (player_id)
        REFERENCES public.players(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_matches_program
        FOREIGN KEY (program_id)
        REFERENCES public.programs(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT ck_matches_status
        CHECK (
            status IN (
                'in_progress',
                'finished'
            )
        ),

    CONSTRAINT ck_matches_score
        CHECK (
            score BETWEEN 0 AND 90
        ),

    /*
        Se a partida estiver finalizada,
        finished_at obrigatoriamente deverá existir.

        Enquanto estiver em andamento,
        finished_at deverá permanecer NULL.
    */
    CONSTRAINT ck_matches_finished_state
        CHECK (

            (
                status = 'in_progress'
                AND finished_at IS NULL
            )

            OR

            (
                status = 'finished'
                AND finished_at IS NOT NULL
            )

        ),

    CONSTRAINT ck_matches_finished_time
        CHECK (
            finished_at IS NULL
            OR finished_at >= started_at
        )
);



-- ============================================================
-- 6. ATTEMPTS
-- ============================================================
-- Representa CADA tentativa de resposta feita pelo jogador.
--
-- Uma pergunta poderá possuir no máximo:
--
-- tentativa 1
-- tentativa 2
-- tentativa 3
--
-- Pontuação:
--
-- acerto tentativa 1 = 3
-- acerto tentativa 2 = 2
-- acerto tentativa 3 = 1
-- erro                 = 0
-- ============================================================

CREATE TABLE public.attempts (

    id BIGINT GENERATED ALWAYS AS IDENTITY,

    match_id BIGINT NOT NULL,

    question_id BIGINT NOT NULL,

    selected_option_id BIGINT NOT NULL,

    attempt_number SMALLINT NOT NULL,

    is_correct BOOLEAN NOT NULL,

    points_awarded SMALLINT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_attempts
        PRIMARY KEY (id),

    CONSTRAINT fk_attempts_match
        FOREIGN KEY (match_id)
        REFERENCES public.matches(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_attempts_question
        FOREIGN KEY (question_id)
        REFERENCES public.questions(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    /*
        Essa FK composta garante que selected_option_id
        realmente pertença à question_id informada.

        Isso impede, por exemplo:

        question_id = 5
        selected_option_id pertencendo à pergunta 10
    */
    CONSTRAINT fk_attempts_selected_option
        FOREIGN KEY (
            question_id,
            selected_option_id
        )
        REFERENCES public.question_options(
            question_id,
            id
        )
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    /*
        A mesma pergunta não poderá possuir duas
        "tentativas 1" dentro da mesma partida.
    */
    CONSTRAINT uq_attempts_match_question_number
        UNIQUE (
            match_id,
            question_id,
            attempt_number
        ),

    CONSTRAINT ck_attempts_number
        CHECK (
            attempt_number BETWEEN 1 AND 3
        ),

    /*
        Regra matemática da pontuação.

        Se acertou:

        tentativa 1:
        4 - 1 = 3

        tentativa 2:
        4 - 2 = 2

        tentativa 3:
        4 - 3 = 1

        Se errou:
        pontos obrigatoriamente = 0
    */
    CONSTRAINT ck_attempts_points
        CHECK (

            points_awarded =

            CASE

                WHEN is_correct = TRUE
                    THEN 4 - attempt_number

                ELSE 0

            END
        )
);



-- ============================================================
-- INDEXES
-- ============================================================
-- PostgreSQL cria índices automaticamente para Primary Keys
-- e UNIQUE constraints.
--
-- Porém Foreign Keys não recebem índices automaticamente.
--
-- Esses índices ajudam principalmente:
--
-- JOIN
-- WHERE
-- ranking
-- dashboard
-- busca de histórico
-- ============================================================


CREATE INDEX idx_questions_program_id
ON public.questions(program_id);


CREATE INDEX idx_question_options_question_id
ON public.question_options(question_id);


CREATE INDEX idx_matches_player_id
ON public.matches(player_id);


CREATE INDEX idx_matches_program_id
ON public.matches(program_id);


CREATE INDEX idx_matches_status
ON public.matches(status);


CREATE INDEX idx_matches_score
ON public.matches(score);


CREATE INDEX idx_matches_player_score
ON public.matches(
    player_id,
    score DESC
);


CREATE INDEX idx_attempts_match_id
ON public.attempts(match_id);


CREATE INDEX idx_attempts_question_id
ON public.attempts(question_id);


CREATE INDEX idx_attempts_selected_option_id
ON public.attempts(selected_option_id);


CREATE INDEX idx_attempts_match_question
ON public.attempts(
    match_id,
    question_id
);



-- ============================================================
-- ROW LEVEL SECURITY — SUPABASE
-- ============================================================
-- Como nossa arquitetura será:
--
-- Frontend
--    ↓
-- Python API
--    ↓
-- Supabase
--
-- o navegador NÃO precisa possuir acesso administrativo
-- direto às tabelas.
--
-- Habilitamos RLS.
--
-- Nenhuma policy pública será criada inicialmente.
--
-- O backend autorizado poderá utilizar credenciais
-- próprias do servidor.
-- ============================================================


ALTER TABLE public.players
ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.programs
ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.questions
ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.question_options
ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.matches
ENABLE ROW LEVEL SECURITY;


ALTER TABLE public.attempts
ENABLE ROW LEVEL SECURITY;



COMMIT;


-- ============================================================
-- FIM DO SCHEMA
-- ============================================================