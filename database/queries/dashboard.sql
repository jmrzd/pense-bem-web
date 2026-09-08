-- ============================================================
-- PENSE BEM WEB
-- DASHBOARD QUERIES
-- PostgreSQL / Supabase
--
-- Banco de Dados:
-- João Miguel (Gelado)
--
-- Dashboard:
-- Ibson
--
-- Objetivo:
-- Fornecer dados reais para ranking, indicadores,
-- gráficos, histórico e análise de desempenho.
-- ============================================================


-- ============================================================
-- 1. RANKING GERAL
-- ============================================================
-- Cada jogador aparece apenas uma vez.
-- O ranking utiliza a MELHOR pontuação do jogador.
-- Apenas partidas finalizadas entram no ranking.
-- ============================================================

WITH player_stats AS (

    SELECT
        p.id AS player_id,
        p.nickname,

        COUNT(m.id)
            FILTER (WHERE m.status = 'finished')
            AS total_matches,

        MAX(m.score)
            FILTER (WHERE m.status = 'finished')
            AS best_score,

        ROUND(
            AVG(m.score)
                FILTER (WHERE m.status = 'finished'),
            2
        ) AS average_score

    FROM public.players p

    LEFT JOIN public.matches m
        ON m.player_id = p.id

    GROUP BY
        p.id,
        p.nickname
)

SELECT
    DENSE_RANK() OVER (
        ORDER BY best_score DESC
    ) AS ranking_position,

    player_id,
    nickname,
    best_score,
    average_score,
    total_matches

FROM player_stats

WHERE total_matches > 0

ORDER BY
    best_score DESC,
    average_score DESC,
    nickname ASC;



-- ============================================================
-- 2. INDICADORES GERAIS DO DASHBOARD
-- ============================================================
-- Cards principais.
--
-- Exemplos:
--
-- Total de jogadores
-- Total de partidas
-- Média geral
-- Melhor score
-- Partidas perfeitas
-- ============================================================

SELECT

    (
        SELECT COUNT(*)
        FROM public.players
    ) AS total_players,

    (
        SELECT COUNT(*)
        FROM public.matches
        WHERE status = 'finished'
    ) AS finished_matches,

    (
        SELECT COUNT(*)
        FROM public.matches
        WHERE status = 'in_progress'
    ) AS matches_in_progress,

    COALESCE(
        (
            SELECT ROUND(AVG(score), 2)
            FROM public.matches
            WHERE status = 'finished'
        ),
        0
    ) AS average_score,

    COALESCE(
        (
            SELECT MAX(score)
            FROM public.matches
            WHERE status = 'finished'
        ),
        0
    ) AS highest_score,

    (
        SELECT COUNT(*)
        FROM public.matches
        WHERE
            status = 'finished'
            AND score = 90
    ) AS perfect_matches;



-- ============================================================
-- 3. DESEMPENHO POR TENTATIVA
-- ============================================================
-- Mostra quantos acertos ocorreram em:
--
-- Tentativa 1
-- Tentativa 2
-- Tentativa 3
--
-- Excelente para gráfico.
-- ============================================================

SELECT

    attempt_number,

    COUNT(*) AS total_attempts,

    COUNT(*)
        FILTER (WHERE is_correct = TRUE)
        AS correct_attempts,

    COUNT(*)
        FILTER (WHERE is_correct = FALSE)
        AS incorrect_attempts,

    ROUND(
        100.0
        *
        COUNT(*) FILTER (WHERE is_correct = TRUE)
        /
        NULLIF(COUNT(*), 0),
        2
    ) AS success_percentage

FROM public.attempts

GROUP BY attempt_number

ORDER BY attempt_number;



-- ============================================================
-- 4. DISTRIBUIÇÃO DOS PONTOS GANHOS
-- ============================================================
-- Quantas tentativas geraram:
--
-- 0 pontos
-- 1 ponto
-- 2 pontos
-- 3 pontos
-- ============================================================

SELECT

    points_awarded,

    COUNT(*) AS occurrences

FROM public.attempts

GROUP BY points_awarded

ORDER BY points_awarded;



-- ============================================================
-- 5. PERGUNTAS MAIS DIFÍCEIS
-- ============================================================
-- Aqui não contamos apenas erros individuais.
--
-- Analisamos cada pergunta dentro de cada partida.
--
-- Se o jogador tentou 3 vezes e nunca acertou,
-- aquela pergunta foi uma FALHA naquela partida.
--
-- Isso gera uma métrica de dificuldade mais útil.
-- ============================================================

WITH question_performance AS (

    SELECT

        a.match_id,
        a.question_id,

        BOOL_OR(a.is_correct) AS eventually_correct,

        COUNT(*) AS attempts_used

    FROM public.attempts a

    INNER JOIN public.matches m
        ON m.id = a.match_id

    WHERE m.status = 'finished'

    GROUP BY
        a.match_id,
        a.question_id
)

SELECT

    pr.id AS program_id,
    pr.title AS program_title,

    q.id AS question_id,
    q.question_number,
    q.prompt,

    COUNT(*) AS times_played,

    COUNT(*)
        FILTER (
            WHERE qp.eventually_correct = FALSE
        ) AS total_failures,

    ROUND(
        100.0
        *
        COUNT(*) FILTER (
            WHERE qp.eventually_correct = FALSE
        )
        /
        NULLIF(COUNT(*), 0),
        2
    ) AS failure_percentage,

    ROUND(
        AVG(qp.attempts_used),
        2
    ) AS average_attempts_used

FROM question_performance qp

INNER JOIN public.questions q
    ON q.id = qp.question_id

INNER JOIN public.programs pr
    ON pr.id = q.program_id

GROUP BY

    pr.id,
    pr.title,

    q.id,
    q.question_number,
    q.prompt

ORDER BY

    failure_percentage DESC,
    average_attempts_used DESC,
    q.question_number ASC;



-- ============================================================
-- 6. PERGUNTAS COM MAIS TENTATIVAS ERRADAS
-- ============================================================
-- Diferente da consulta anterior.
--
-- Aqui contamos erros individuais.
-- Útil para encontrar perguntas que estão causando
-- muitas respostas incorretas.
-- ============================================================

SELECT

    pr.title AS program_title,

    q.id AS question_id,
    q.question_number,
    q.prompt,

    COUNT(a.id) AS total_attempts,

    COUNT(a.id)
        FILTER (WHERE a.is_correct = FALSE)
        AS wrong_attempts,

    COUNT(a.id)
        FILTER (WHERE a.is_correct = TRUE)
        AS correct_attempts,

    ROUND(
        100.0
        *
        COUNT(a.id)
            FILTER (WHERE a.is_correct = FALSE)
        /
        NULLIF(COUNT(a.id), 0),
        2
    ) AS wrong_attempt_percentage

FROM public.questions q

INNER JOIN public.programs pr
    ON pr.id = q.program_id

LEFT JOIN public.attempts a
    ON a.question_id = q.id

GROUP BY

    pr.id,
    pr.title,

    q.id,
    q.question_number,
    q.prompt

HAVING COUNT(a.id) > 0

ORDER BY

    wrong_attempts DESC,
    wrong_attempt_percentage DESC;



-- ============================================================
-- 7. ESTATÍSTICAS POR PROGRAMA
-- ============================================================

SELECT

    pr.id AS program_id,
    pr.code,
    pr.title,

    COUNT(m.id)
        FILTER (WHERE m.status = 'finished')
        AS finished_matches,

    COUNT(DISTINCT m.player_id)
        FILTER (WHERE m.status = 'finished')
        AS unique_players,

    COALESCE(
        ROUND(
            AVG(m.score)
                FILTER (WHERE m.status = 'finished'),
            2
        ),
        0
    ) AS average_score,

    COALESCE(
        MAX(m.score)
            FILTER (WHERE m.status = 'finished'),
        0
    ) AS highest_score,

    COALESCE(
        MIN(m.score)
            FILTER (WHERE m.status = 'finished'),
        0
    ) AS lowest_score

FROM public.programs pr

LEFT JOIN public.matches m
    ON m.program_id = pr.id

GROUP BY

    pr.id,
    pr.code,
    pr.title

ORDER BY pr.id;



-- ============================================================
-- 8. ÚLTIMAS PARTIDAS
-- ============================================================
-- Pode alimentar uma tabela:
--
-- "Atividade recente"
-- ============================================================

SELECT

    m.id AS match_id,

    p.id AS player_id,
    p.nickname,

    pr.title AS program_title,

    m.score,

    m.started_at,
    m.finished_at

FROM public.matches m

INNER JOIN public.players p
    ON p.id = m.player_id

INNER JOIN public.programs pr
    ON pr.id = m.program_id

WHERE m.status = 'finished'

ORDER BY
    m.finished_at DESC

LIMIT 20;



-- ============================================================
-- 9. EVOLUÇÃO DOS JOGADORES
-- ============================================================
-- Mostra como o score do jogador evoluiu
-- partida após partida.
--
-- Pode gerar gráfico de linha.
-- ============================================================

SELECT

    p.id AS player_id,
    p.nickname,

    m.id AS match_id,

    pr.title AS program_title,

    m.score,

    m.finished_at,

    ROW_NUMBER() OVER (

        PARTITION BY p.id

        ORDER BY
            m.finished_at,
            m.id

    ) AS match_number,

    m.score
    -
    LAG(m.score) OVER (

        PARTITION BY p.id

        ORDER BY
            m.finished_at,
            m.id

    ) AS score_change

FROM public.matches m

INNER JOIN public.players p
    ON p.id = m.player_id

INNER JOIN public.programs pr
    ON pr.id = m.program_id

WHERE m.status = 'finished'

ORDER BY

    p.nickname,
    m.finished_at;



-- ============================================================
-- 10. JOGADORES MAIS ATIVOS
-- ============================================================
-- Quem realizou mais partidas.
-- ============================================================

SELECT

    p.id AS player_id,
    p.nickname,

    COUNT(m.id) AS total_matches,

    MAX(m.finished_at) AS last_match

FROM public.players p

INNER JOIN public.matches m
    ON m.player_id = p.id

WHERE m.status = 'finished'

GROUP BY
    p.id,
    p.nickname

ORDER BY

    total_matches DESC,
    last_match DESC;



-- ============================================================
-- 11. DISTRIBUIÇÃO DE SCORES
-- ============================================================
-- Pode alimentar gráfico de barras ou pizza.
--
-- Faixas:
--
-- 0  - 30
-- 31 - 60
-- 61 - 89
-- 90
-- ============================================================

SELECT

    CASE

        WHEN score BETWEEN 0 AND 30
            THEN '0-30'

        WHEN score BETWEEN 31 AND 60
            THEN '31-60'

        WHEN score BETWEEN 61 AND 89
            THEN '61-89'

        WHEN score = 90
            THEN '90'

    END AS score_range,

    COUNT(*) AS total_matches

FROM public.matches

WHERE status = 'finished'

GROUP BY

    CASE

        WHEN score BETWEEN 0 AND 30
            THEN '0-30'

        WHEN score BETWEEN 31 AND 60
            THEN '31-60'

        WHEN score BETWEEN 61 AND 89
            THEN '61-89'

        WHEN score = 90
            THEN '90'

    END

ORDER BY

    MIN(score);



-- ============================================================
-- 12. PARTIDAS POR DIA
-- ============================================================
-- Pode gerar gráfico temporal mostrando
-- utilização do sistema.
-- ============================================================

SELECT

    DATE(finished_at) AS match_date,

    COUNT(*) AS total_matches,

    ROUND(
        AVG(score),
        2
    ) AS average_score

FROM public.matches

WHERE status = 'finished'

GROUP BY
    DATE(finished_at)

ORDER BY
    match_date;



-- ============================================================
-- 13. DESEMPENHO COMPLETO POR JOGADOR
-- ============================================================
-- Consulta detalhada útil para cards e perfil.
-- ============================================================

SELECT

    p.id AS player_id,
    p.nickname,

    COUNT(m.id)
        FILTER (WHERE m.status = 'finished')
        AS total_matches,

    COALESCE(
        MAX(m.score)
            FILTER (WHERE m.status = 'finished'),
        0
    ) AS best_score,

    COALESCE(
        MIN(m.score)
            FILTER (WHERE m.status = 'finished'),
        0
    ) AS lowest_score,

    COALESCE(
        ROUND(
            AVG(m.score)
                FILTER (WHERE m.status = 'finished'),
            2
        ),
        0
    ) AS average_score,

    MAX(m.finished_at)
        FILTER (WHERE m.status = 'finished')
        AS last_match

FROM public.players p

LEFT JOIN public.matches m
    ON m.player_id = p.id

GROUP BY
    p.id,
    p.nickname

ORDER BY
    best_score DESC;



-- ============================================================
-- 14. TAXA GERAL DE ACERTOS
-- ============================================================

SELECT

    COUNT(*) AS total_attempts,

    COUNT(*)
        FILTER (WHERE is_correct = TRUE)
        AS correct_attempts,

    COUNT(*)
        FILTER (WHERE is_correct = FALSE)
        AS incorrect_attempts,

    COALESCE(
        ROUND(
            100.0
            *
            COUNT(*) FILTER (WHERE is_correct = TRUE)
            /
            NULLIF(COUNT(*), 0),
            2
        ),
        0
    ) AS success_percentage,

    COALESCE(
        ROUND(
            100.0
            *
            COUNT(*) FILTER (WHERE is_correct = FALSE)
            /
            NULLIF(COUNT(*), 0),
            2
        ),
        0
    ) AS error_percentage

FROM public.attempts;



-- ============================================================
-- 15. AUDITORIA DE SCORE
-- ============================================================
-- Consulta de suporte / QA.
--
-- Compara:
--
-- score salvo em matches
--
-- VS
--
-- soma dos pontos registrados em attempts.
--
-- Idealmente os dois valores devem ser iguais
-- quando a partida estiver finalizada.
-- ============================================================

SELECT

    m.id AS match_id,

    p.nickname,

    m.score AS stored_score,

    COALESCE(
        SUM(a.points_awarded),
        0
    ) AS calculated_score,

    m.score
    -
    COALESCE(
        SUM(a.points_awarded),
        0
    ) AS difference

FROM public.matches m

INNER JOIN public.players p
    ON p.id = m.player_id

LEFT JOIN public.attempts a
    ON a.match_id = m.id

WHERE m.status = 'finished'

GROUP BY

    m.id,
    p.nickname,
    m.score

ORDER BY

    ABS(
        m.score
        -
        COALESCE(
            SUM(a.points_awarded),
            0
        )
    ) DESC;



-- ============================================================
-- FIM DAS QUERIES DO DASHBOARD
-- ============================================================