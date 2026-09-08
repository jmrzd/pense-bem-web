# 🗄️ Banco de Dados — Pense Bem Web

Este documento descreve a modelagem inicial do banco de dados do **Pense Bem Web**.

O banco será responsável por armazenar os jogadores, programas, perguntas, alternativas, partidas, tentativas e resultados necessários para o funcionamento do jogo, ranking e dashboard.

---

# 🧠 Tecnologias

O projeto utilizará:

- Supabase;
- PostgreSQL;
- SQL.

O Supabase será utilizado como plataforma de hospedagem e gerenciamento do banco PostgreSQL.

A estrutura principal do banco será criada através do arquivo:

`database/schema.sql`

As consultas utilizadas pelo dashboard poderão ser armazenadas em:

`database/queries/dashboard.sql`

---

# 🎯 Objetivos da modelagem

A modelagem foi planejada para permitir:

- cadastro de jogadores;
- vários programas;
- 30 perguntas por programa;
- alternativas A, B, C e D;
- apenas uma alternativa correta por pergunta;
- até 3 tentativas por pergunta;
- pontuação de 0 a 90;
- várias partidas por jogador;
- histórico de partidas;
- ranking;
- estatísticas;
- identificação das perguntas com maior índice de erro;
- análise de desempenho por tentativa;
- evolução dos jogadores;
- possibilidade de alterar perguntas sem alterar a lógica principal do backend.

---

# 📊 Entidades principais

O banco será composto inicialmente pelas seguintes entidades:

```text
PLAYERS
PROGRAMS
QUESTIONS
QUESTION_OPTIONS
MATCHES
ATTEMPTS
```

Cada tabela possui uma responsabilidade específica dentro do sistema.

---

# 🔗 Visão geral dos relacionamentos

```text
PLAYERS
   │
   │ 1:N
   ▼
MATCHES
   │
   ├──────────────────────────┐
   │                          │
   │ N:1                      │ 1:N
   ▼                          ▼
PROGRAMS                  ATTEMPTS
   │                          │
   │ 1:N                      │ N:1
   ▼                          ▼
QUESTIONS ◄───────────────────┘
   │
   │ 1:N
   ▼
QUESTION_OPTIONS
```

Outra forma de visualizar:

```text
PLAYER
   │
   └── realiza várias
          │
          ▼
       MATCHES
          │
          ├── pertence a → PROGRAM
          │
          └── possui vários → ATTEMPTS
                                │
                                └── pertence a → QUESTION

PROGRAM
   │
   └── possui várias → QUESTIONS
                           │
                           └── possuem → QUESTION_OPTIONS
```

---

# 👤 Tabela `players`

Responsável por armazenar os jogadores.

## Estrutura inicial

```text
players

id
nickname
created_at
```

## Campos

| Campo | Tipo sugerido | Regra |
|---|---|---|
| id | BIGINT | Primary Key |
| nickname | VARCHAR(40) | NOT NULL / UNIQUE inicialmente |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## Primary Key

O campo:

```text
id
```

será a chave primária da tabela.

Exemplo:

```text
id | nickname
---|---------
1  | Gelado
2  | JP
3  | Ibson
```

O `nickname` não será utilizado como chave primária.

Isso evita relacionamentos baseados diretamente em textos e permite que todas as outras tabelas utilizem o `id` do jogador.

---

## Nickname

Inicialmente, o `nickname` poderá possuir a restrição:

```text
UNIQUE
```

Isso permitirá identificar novamente um jogador utilizando o mesmo apelido.

Exemplo:

```text
Gelado → id 1
```

Ao iniciar outra partida como `Gelado`, o sistema poderá localizar o mesmo jogador em vez de criar outro registro.

Caso a equipe queira permitir apelidos repetidos futuramente, essa regra poderá ser alterada.

---

# 📚 Tabela `programs`

Responsável por armazenar os programas disponíveis no jogo.

## Estrutura

```text
programs

id
code
title
description
active
created_at
```

## Campos

| Campo | Tipo sugerido | Regra |
|---|---|---|
| id | BIGINT | Primary Key |
| code | VARCHAR | UNIQUE / NOT NULL |
| title | VARCHAR | NOT NULL |
| description | TEXT | Opcional |
| active | BOOLEAN | DEFAULT TRUE |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## Exemplo

```text
id | code | title
---|------|-------------------
1  | P01  | Programa 01
2  | P02  | Programa 02
3  | P03  | Programa 03
```

O campo `code` permitirá identificar um programa de maneira simples através da aplicação.

---

# ❓ Tabela `questions`

Responsável por armazenar as perguntas.

## Estrutura

```text
questions

id
program_id
question_number
prompt
```

## Campos

| Campo | Tipo sugerido | Regra |
|---|---|---|
| id | BIGINT | Primary Key |
| program_id | BIGINT | Foreign Key |
| question_number | INTEGER | NOT NULL |
| prompt | TEXT | NOT NULL |

---

## Relacionamento

```text
PROGRAMS
   │
   │ 1:N
   ▼
QUESTIONS
```

Um programa possui várias perguntas.

Cada pergunta pertence a apenas um programa.

---

## Foreign Key

```text
program_id
```

referencia:

```text
programs.id
```

---

## Número da pergunta

Cada pergunta possuirá um número entre:

```text
1 e 30
```

O banco deverá impedir números inválidos utilizando uma restrição `CHECK`.

Exemplo:

```text
question_number >= 1
AND
question_number <= 30
```

---

## Evitando perguntas duplicadas dentro do programa

O conjunto:

```text
program_id + question_number
```

deverá ser único.

Exemplo válido:

```text
Programa 1 → Pergunta 1
Programa 1 → Pergunta 2
Programa 2 → Pergunta 1
```

Exemplo inválido:

```text
Programa 1 → Pergunta 5
Programa 1 → Pergunta 5
```

Para isso poderá ser utilizada uma restrição:

```text
UNIQUE(program_id, question_number)
```

---

# 🔤 Tabela `question_options`

Responsável por armazenar as alternativas de cada pergunta.

## Estrutura

```text
question_options

id
question_id
option_code
option_text
is_correct
```

## Campos

| Campo | Tipo sugerido | Regra |
|---|---|---|
| id | BIGINT | Primary Key |
| question_id | BIGINT | Foreign Key |
| option_code | CHAR(1) | A, B, C ou D |
| option_text | TEXT | NOT NULL |
| is_correct | BOOLEAN | NOT NULL |

---

## Relacionamento

```text
QUESTIONS
   │
   │ 1:N
   ▼
QUESTION_OPTIONS
```

Uma pergunta possuirá várias alternativas.

No projeto inicial serão utilizadas:

```text
A
B
C
D
```

---

## Exemplo

```text
Pergunta:

Qual é a capital do Brasil?

A → Rio de Janeiro
B → São Paulo
C → Brasília
D → Salvador
```

No banco:

```text
option_code | option_text      | is_correct
------------|------------------|-----------
A           | Rio de Janeiro   | false
B           | São Paulo        | false
C           | Brasília         | true
D           | Salvador         | false
```

---

## Validação das alternativas

O campo:

```text
option_code
```

deverá aceitar apenas:

```text
A
B
C
D
```

Através de uma restrição `CHECK`.

---

## Evitando alternativa duplicada

Uma mesma pergunta não poderá possuir duas alternativas com o mesmo código.

Será utilizada:

```text
UNIQUE(question_id, option_code)
```

---

## Uma alternativa correta por pergunta

Cada pergunta deverá possuir apenas uma resposta correta.

A modelagem deverá impedir que duas alternativas sejam marcadas simultaneamente como corretas.

Exemplo inválido:

```text
A → true
B → false
C → true
D → false
```

O PostgreSQL permite reforçar essa regra através de um índice único parcial utilizando:

```text
WHERE is_correct = true
```

Assim, cada pergunta poderá possuir no máximo uma alternativa marcada como correta.

---

# 🎮 Tabela `matches`

Responsável por armazenar cada partida realizada.

## Estrutura

```text
matches

id
player_id
program_id
score
correct_answers
wrong_answers
started_at
finished_at
```

## Campos

| Campo | Tipo sugerido | Regra |
|---|---|---|
| id | BIGINT | Primary Key |
| player_id | BIGINT | Foreign Key |
| program_id | BIGINT | Foreign Key |
| score | INTEGER | 0 até 90 |
| correct_answers | INTEGER | 0 até 30 |
| wrong_answers | INTEGER | 0 até 30 |
| started_at | TIMESTAMPTZ | DEFAULT NOW() |
| finished_at | TIMESTAMPTZ | Pode iniciar NULL |

---

# 🔗 Player e partidas

```text
PLAYERS
   │
   │ 1:N
   ▼
MATCHES
```

Um jogador poderá possuir várias partidas.

Uma partida pertence a apenas um jogador.

---

## Foreign Key

```text
player_id
```

referencia:

```text
players.id
```

---

# 🔗 Programa e partidas

```text
PROGRAMS
   │
   │ 1:N
   ▼
MATCHES
```

Um programa poderá ser jogado várias vezes.

Cada partida pertence a um programa.

---

## Foreign Key

```text
program_id
```

referencia:

```text
programs.id
```

---

# 🏆 Score

A pontuação deverá estar obrigatoriamente entre:

```text
0 e 90
```

O banco deverá impedir valores inválidos utilizando:

```text
CHECK(score BETWEEN 0 AND 90)
```

Exemplos inválidos:

```text
score = -1
score = 95
score = 200
```

Mesmo que exista um erro no backend, o banco continuará protegendo a integridade dos dados.

---

# ✅ Acertos e erros

Cada partida possui 30 perguntas.

Portanto:

```text
correct_answers
```

e:

```text
wrong_answers
```

deverão aceitar valores entre:

```text
0 e 30
```

Idealmente:

```text
correct_answers + wrong_answers = 30
```

quando a partida estiver concluída.

Essa validação poderá ser realizada pelo backend e, dependendo da implementação final, reforçada no banco.

---

# 🎯 Tabela `attempts`

Esta é uma das tabelas mais importantes para o dashboard.

Ela armazenará cada tentativa realizada pelo jogador durante uma partida.

## Estrutura

```text
attempts

id
match_id
question_id
attempt_number
selected_option
is_correct
points_awarded
created_at
```

## Campos

| Campo | Tipo sugerido | Regra |
|---|---|---|
| id | BIGINT | Primary Key |
| match_id | BIGINT | Foreign Key |
| question_id | BIGINT | Foreign Key |
| attempt_number | INTEGER | 1 até 3 |
| selected_option | CHAR(1) | A, B, C ou D |
| is_correct | BOOLEAN | NOT NULL |
| points_awarded | INTEGER | 0 até 3 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

# 🔗 Partida e tentativas

```text
MATCHES
   │
   │ 1:N
   ▼
ATTEMPTS
```

Uma partida possui várias tentativas.

Cada tentativa pertence a uma única partida.

---

## Foreign Key

```text
match_id
```

referencia:

```text
matches.id
```

---

# 🔗 Pergunta e tentativas

```text
QUESTIONS
   │
   │ 1:N
   ▼
ATTEMPTS
```

Uma pergunta poderá aparecer em muitas tentativas realizadas por diferentes jogadores.

Cada tentativa pertence a uma pergunta específica.

---

# 🔢 Número da tentativa

O campo:

```text
attempt_number
```

poderá possuir apenas:

```text
1
2
3
```

Através da restrição:

```text
CHECK(attempt_number BETWEEN 1 AND 3)
```

Assim o banco ajuda a impedir uma quarta tentativa.

---

# 🔤 Alternativa selecionada

O campo:

```text
selected_option
```

aceitará apenas:

```text
A
B
C
D
```

---

# ⭐ Pontos por tentativa

O campo:

```text
points_awarded
```

poderá possuir:

```text
0
1
2
3
```

Exemplos:

```text
1ª tentativa correta → 3
2ª tentativa correta → 2
3ª tentativa correta → 1
tentativa incorreta   → 0
```

A lógica principal continuará sendo responsabilidade do backend Python.

O banco armazenará o resultado produzido pela lógica.

---

# 🚫 Evitando tentativa duplicada

O mesmo jogador não poderá registrar duas vezes a mesma tentativa da mesma pergunta dentro da mesma partida.

Exemplo inválido:

```text
Partida 15
Pergunta 7
Tentativa 2

Partida 15
Pergunta 7
Tentativa 2
```

Será utilizada:

```text
UNIQUE(match_id, question_id, attempt_number)
```

---

# 💡 Por que não criar uma tabela `responses`?

Inicialmente não será necessária uma tabela separada chamada `responses`.

A própria tabela:

```text
attempts
```

já registra:

- qual pergunta foi respondida;
- qual alternativa foi escolhida;
- qual tentativa foi realizada;
- se a resposta estava correta;
- quantos pontos foram obtidos.

Portanto:

```text
ATTEMPTS = histórico das respostas do jogador
```

Isso evita duplicação desnecessária de dados.

Caso o projeto cresça e exista uma necessidade específica, a modelagem poderá ser revisada.

---

# 🔑 Primary Keys

Todas as tabelas principais possuirão uma chave primária própria.

```text
players.id
programs.id
questions.id
question_options.id
matches.id
attempts.id
```

A chave primária identifica cada registro de maneira única.

---

# 🔗 Foreign Keys

As principais chaves estrangeiras serão:

```text
questions.program_id
        ↓
programs.id
```

```text
question_options.question_id
        ↓
questions.id
```

```text
matches.player_id
        ↓
players.id
```

```text
matches.program_id
        ↓
programs.id
```

```text
attempts.match_id
        ↓
matches.id
```

```text
attempts.question_id
        ↓
questions.id
```

As Foreign Keys garantem a integridade dos relacionamentos.

---

# 🧩 Cardinalidades

## Player → Matches

```text
1:N
```

Um player pode possuir várias partidas.

Uma partida pertence a apenas um player.

---

## Program → Questions

```text
1:N
```

Um programa possui várias perguntas.

Uma pergunta pertence a um programa.

---

## Question → Options

```text
1:N
```

Uma pergunta possui várias alternativas.

Uma alternativa pertence a apenas uma pergunta.

---

## Program → Matches

```text
1:N
```

Um programa pode possuir várias partidas realizadas.

Uma partida utiliza apenas um programa.

---

## Match → Attempts

```text
1:N
```

Uma partida possui várias tentativas.

Uma tentativa pertence a uma partida.

---

## Question → Attempts

```text
1:N
```

Uma pergunta pode possuir muitas tentativas ao longo de diferentes partidas.

Uma tentativa está associada a uma pergunta.

---

# 🛡️ Integridade dos dados

O banco utilizará restrições para evitar dados inválidos.

Entre elas:

```text
PRIMARY KEY
FOREIGN KEY
NOT NULL
UNIQUE
CHECK
DEFAULT
```

Exemplos:

```text
score entre 0 e 90
```

```text
attempt_number entre 1 e 3
```

```text
question_number entre 1 e 30
```

```text
selected_option apenas A/B/C/D
```

```text
uma tentativa não pode ser duplicada
```

```text
uma pergunta não pode possuir duas alternativas A
```

Essas regras ajudam a proteger o banco mesmo caso exista algum erro no frontend ou backend.

---

# ⚡ Índices

Alguns campos utilizados frequentemente em relacionamentos e consultas poderão possuir índices.

Exemplos:

```text
questions.program_id
question_options.question_id
matches.player_id
matches.program_id
attempts.match_id
attempts.question_id
```

Isso poderá melhorar o desempenho das consultas à medida que o volume de dados crescer.

---

# 📊 Banco alimentando o Dashboard

Um dos principais objetivos da modelagem é permitir que o dashboard utilize dados reais.

Exemplo:

```text
PLAYER
   ↓
MATCH
   ↓
ATTEMPTS
   ↓
Banco PostgreSQL
   ↓
Consultas SQL
   ↓
API Python
   ↓
Dashboard React
```

---

# 🏆 Ranking

O ranking principal deverá utilizar a melhor pontuação de cada jogador.

Exemplo conceitual:

```sql
SELECT
    player_id,
    MAX(score)
FROM matches
GROUP BY player_id;
```

Resultado:

```text
Gelado → 88
JP     → 84
Ibson  → 79
```

Mesmo que Gelado tenha:

```text
Partida 1 → 60
Partida 2 → 74
Partida 3 → 88
```

o ranking utilizará:

```text
88
```

---

# 📈 Média de pontuação

O banco poderá calcular a média das partidas através de:

```sql
AVG(score)
```

Exemplo:

```text
Partidas:

60
70
80

Média:

70
```

---

# 🎮 Total de partidas

Poderá ser obtido utilizando:

```sql
COUNT(*)
```

na tabela:

```text
matches
```

---

# 👥 Total de jogadores

Poderá ser obtido utilizando:

```sql
COUNT(*)
```

na tabela:

```text
players
```

---

# ❌ Perguntas com maior índice de erro

A tabela `attempts` permitirá descobrir quais perguntas causaram mais erros.

Conceitualmente:

```text
attempts
   ↓
WHERE is_correct = false
   ↓
GROUP BY question_id
   ↓
COUNT
```

Exemplo:

```text
Pergunta 7  → 22 erros
Pergunta 18 → 17 erros
Pergunta 3  → 10 erros
```

Isso poderá alimentar um gráfico no dashboard.

---

# 🎯 Desempenho por tentativa

Também será possível descobrir quantos jogadores acertaram:

```text
na 1ª tentativa
na 2ª tentativa
na 3ª tentativa
```

Exemplo:

```text
Tentativa 1 → 65% dos acertos
Tentativa 2 → 25%
Tentativa 3 → 10%
```

Esses dados serão obtidos principalmente através da tabela:

```text
attempts
```

---

# 📈 Evolução do jogador

Como cada jogador poderá possuir várias partidas, será possível montar um histórico.

Exemplo:

```text
Gelado

Partida 1 → 51
Partida 2 → 66
Partida 3 → 72
Partida 4 → 85
```

O dashboard poderá transformar esses dados em um gráfico de evolução.

---

# 🧮 Exemplo de dados relacionados

```text
PLAYER

id = 1
nickname = Gelado
```

```text
MATCH

id = 50
player_id = 1
program_id = 2
score = 82
```

```text
ATTEMPT

match_id = 50
question_id = 12
attempt_number = 1
selected_option = B
is_correct = false
points_awarded = 0
```

```text
ATTEMPT

match_id = 50
question_id = 12
attempt_number = 2
selected_option = C
is_correct = true
points_awarded = 2
```

Isso permite reconstruir exatamente o que aconteceu durante a partida.

---

# 🔄 Exemplo de relacionamento completo

```text
Gelado
PLAYER ID 1
     │
     ▼
PARTIDA 50
Programa 2
Score 82
     │
     ▼
Pergunta 12
     │
     ├── Tentativa 1
     │      B
     │      incorreta
     │      0 pontos
     │
     └── Tentativa 2
            C
            correta
            2 pontos
```

---

# 📝 Perguntas como dados

As perguntas não serão fixadas diretamente dentro do código Python.

Elas serão armazenadas no banco.

Exemplo:

```text
PROGRAMS
   ↓
QUESTIONS
   ↓
QUESTION_OPTIONS
```

Isso permitirá futuramente:

- trocar uma pergunta;
- corrigir uma alternativa;
- adicionar novos programas;
- desativar programas;
- adicionar novas perguntas;
- reutilizar a mesma lógica Python.

Sem precisar modificar o funcionamento principal do jogo.

---

# 🔄 Migrations

Alterações futuras na estrutura do banco poderão ser registradas na pasta:

```text
database/migrations/
```

Exemplo:

```text
001_create_tables.sql
002_add_indexes.sql
003_update_players.sql
```

Isso permitirá acompanhar a evolução do banco de dados através do Git.

---

# 🌱 Seeds

Dados iniciais utilizados para popular o banco poderão ser armazenados em:

```text
database/seeds/
```

Essa pasta poderá conter futuramente:

- programas;
- 30 perguntas;
- alternativas;
- gabaritos;
- dados de teste.

Exemplo:

```text
database/seeds/questions_program_01.sql
```

---

# 📊 Queries do Dashboard

Consultas específicas para estatísticas poderão ser organizadas em:

```text
database/queries/dashboard.sql
```

Esse arquivo poderá conter consultas para:

1. ranking geral;
2. recorde pessoal;
3. média de pontuação;
4. total de jogadores;
5. total de partidas;
6. perguntas com mais erros;
7. desempenho por tentativa;
8. evolução dos jogadores;
9. jogadores mais ativos.

---

# 🔐 Segurança

Credenciais do Supabase não poderão ser armazenadas diretamente nos arquivos SQL ou no repositório.

Exemplos de informações que não devem ser publicadas:

```text
senha do banco
SUPABASE_SERVICE_ROLE_KEY
tokens privados
credenciais administrativas
```

Esses dados deverão permanecer em variáveis de ambiente.

Exemplo:

```text
backend/.env
```

O repositório deverá possuir apenas:

```text
backend/.env.example
```

sem valores reais.

---

# 🔒 Backend e banco

O acesso privilegiado ao banco deverá ser realizado através do backend.

Fluxo recomendado:

```text
React
  ↓
Python API
  ↓
Supabase/PostgreSQL
```

Credenciais administrativas não deverão ser enviadas ao navegador do jogador.

---

# 🧱 Responsabilidade das camadas

```text
Frontend
   ↓
recebe as escolhas do jogador

Backend
   ↓
aplica regras e valida as respostas

Database
   ↓
armazena os dados

Queries
   ↓
transformam dados em informações

Dashboard
   ↓
apresenta essas informações
```

---

# 📌 Resumo da modelagem

```text
PLAYERS
   │
   │ 1:N
   ▼
MATCHES ───────────────► PROGRAMS
   │                       │
   │                       │ 1:N
   ▼                       ▼
ATTEMPTS ◄──────────── QUESTIONS
                           │
                           │ 1:N
                           ▼
                    QUESTION_OPTIONS
```

---

# ✅ Regras principais do banco

```text
1 jogador → várias partidas

1 programa → várias perguntas

1 programa → várias partidas

1 pergunta → alternativas A/B/C/D

1 pergunta → uma alternativa correta

1 partida → várias tentativas

1 pergunta → muitas tentativas ao longo do sistema

máximo de 3 tentativas por pergunta

score entre 0 e 90

30 perguntas por programa

histórico das partidas preservado

ranking baseado na melhor pontuação

dashboard alimentado por dados reais
```

---

# 🚀 Resultado esperado

Com essa estrutura, o banco será capaz de responder perguntas como:

```text
Quem possui o maior score?

Qual é a média das partidas?

Quantas pessoas já jogaram?

Quantas partidas já foram realizadas?

Qual jogador mais jogou?

Qual pergunta possui mais erros?

Quantos acertos aconteceram na primeira tentativa?

Qual foi a evolução de determinado jogador?

Qual é o recorde de cada player?

Quais perguntas estão mais difíceis?
```

Tudo isso utilizando os mesmos dados gerados pelas partidas reais.

---

🎮 **Pense Bem Web — um banco de dados projetado não apenas para armazenar partidas, mas também para transformar cada jogada em informação.**