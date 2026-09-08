# 🗄️ Banco de Dados — Pense Bem Web

Este diretório contém os arquivos relacionados ao banco de dados do **Pense Bem Web**.

O banco será responsável por armazenar e organizar os dados permanentes do sistema, incluindo:

- jogadores;
- programas;
- perguntas;
- alternativas;
- partidas;
- tentativas;
- pontuações;
- dados utilizados no ranking;
- dados utilizados no dashboard.

A tecnologia escolhida para o projeto é:

```text
Supabase
PostgreSQL
SQL
```

---

# 🎯 Objetivo do banco

O banco deverá garantir que os dados do sistema sejam armazenados de forma:

- organizada;
- consistente;
- segura;
- relacionável;
- consultável;
- reutilizável pelo backend e dashboard.

O backend Python será responsável pela comunicação principal com o banco.

---

# 🏗️ Estrutura do diretório

```text
database/
│
├── migrations/
├── queries/
│   └── dashboard.sql
├── seeds/
├── README.md
└── schema.sql
```

---

# 📄 `schema.sql`

Arquivo responsável pela criação da estrutura principal do banco.

Deverá conter:

```text
CREATE TABLE
PRIMARY KEY
FOREIGN KEY
UNIQUE
CHECK
NOT NULL
INDEX
```

Além das demais regras necessárias para garantir a integridade dos dados.

O arquivo deverá ser compatível com:

```text
PostgreSQL / Supabase
```

---

# 📂 `migrations/`

Diretório destinado às alterações futuras do banco.

Exemplos:

```text
adicionar uma coluna

criar uma nova tabela

alterar uma constraint

criar um índice

ajustar relacionamentos
```

Uma migration deverá representar uma mudança específica na estrutura do banco.

---

# 📂 `seeds/`

Diretório destinado aos dados iniciais do sistema.

Exemplos:

```text
programas

perguntas

alternativas
```

As 30 perguntas utilizadas pelo projeto poderão ser adicionadas através de seeds.

Isso permitirá alterar as perguntas sem modificar a lógica principal do backend.

---

# 📂 `queries/`

Diretório destinado às consultas SQL utilizadas pelo sistema.

Principal arquivo:

```text
queries/dashboard.sql
```

Ele deverá conter consultas utilizadas para gerar:

- ranking;
- médias;
- estatísticas;
- histórico;
- indicadores;
- perguntas com mais erros;
- desempenho dos jogadores.

---

# 🧩 Modelo principal

O banco será organizado inicialmente em seis entidades principais:

```text
players

programs

questions

question_options

matches

attempts
```

---

# 👤 `players`

Representa os jogadores do sistema.

Exemplo:

```text
players

id
nickname
created_at
```

O campo `id` será a chave primária.

O nickname será utilizado para identificação visual do jogador.

---

# 📚 `programs`

Representa os programas ou conjuntos de perguntas disponíveis.

Exemplo:

```text
programs

id
code
title
description
active
created_at
```

Cada programa poderá possuir até 30 perguntas numeradas.

---

# ❓ `questions`

Representa as perguntas do jogo.

Exemplo:

```text
questions

id
program_id
question_number
prompt
```

Cada pergunta deverá pertencer a um programa.

Relacionamento:

```text
programs
    │
    │ 1:N
    ▼
questions
```

---

# 🔤 `question_options`

Representa as alternativas disponíveis para cada pergunta.

Exemplo:

```text
question_options

id
question_id
option_code
option_text
is_correct
```

Os códigos das alternativas poderão seguir o padrão:

```text
A
B
C
D
```

Relacionamento:

```text
questions
     │
     │ 1:N
     ▼
question_options
```

---

# 🎮 `matches`

Representa cada partida realizada.

Exemplo:

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

Um jogador poderá realizar várias partidas.

Relacionamento:

```text
players
   │
   │ 1:N
   ▼
matches
```

Um programa também poderá ser utilizado em várias partidas.

```text
programs
   │
   │ 1:N
   ▼
matches
```

---

# 🎯 `attempts`

Representa cada tentativa feita pelo jogador durante uma partida.

Exemplo:

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

Cada pergunta poderá possuir no máximo:

```text
3 tentativas por partida
```

Relacionamentos:

```text
matches
   │
   │ 1:N
   ▼
attempts
```

e:

```text
questions
    │
    │ 1:N
    ▼
attempts
```

---

# 🔗 Visão geral dos relacionamentos

```text
players
   │
   │ 1:N
   ▼
matches
   │
   │ 1:N
   ▼
attempts
   ▲
   │
   │ N:1
questions
   ▲
   │
   │ N:1
programs
```

As alternativas ficam relacionadas às perguntas:

```text
questions
   │
   │ 1:N
   ▼
question_options
```

---

# 🔑 Chaves Primárias

Cada tabela deverá possuir uma chave primária.

Exemplo:

```text
players.id

programs.id

questions.id

question_options.id

matches.id

attempts.id
```

A chave primária identifica cada registro de forma única.

---

# 🔗 Chaves Estrangeiras

As Foreign Keys serão utilizadas para criar os relacionamentos.

Exemplos:

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

---

# 🛡️ Integridade dos dados

O banco deverá impedir situações inválidas.

Exemplos:

```text
tentativa número 0

tentativa número 4

pontuação negativa

score acima de 90

pergunta número 31

alternativa com código inválido
```

Para isso, serão utilizadas regras como:

```text
CHECK

NOT NULL

UNIQUE

FOREIGN KEY
```

---

# 🎯 Regras da pontuação

O sistema utiliza:

```text
1ª tentativa correta = 3 pontos

2ª tentativa correta = 2 pontos

3ª tentativa correta = 1 ponto

3 erros = 0 pontos
```

O backend será responsável pelo cálculo da pontuação.

O banco será responsável por armazenar os resultados e impedir valores inválidos.

---

# 🏆 Ranking

O ranking poderá utilizar a melhor pontuação obtida por cada jogador.

Exemplo conceitual:

```sql
MAX(score)
```

Isso evita que um jogador apareça várias vezes apenas porque realizou várias partidas.

Exemplo:

```text
Gelado

Partida 1 → 70
Partida 2 → 82
Partida 3 → 88
```

Ranking:

```text
Gelado → 88
```

O histórico completo continuará armazenado.

---

# 📊 Dashboard

O dashboard deverá utilizar consultas reais ao banco.

Algumas informações planejadas:

```text
melhor score

média de pontuação

total de jogadores

total de partidas

quantidade de acertos

quantidade de erros

acertos na primeira tentativa

acertos na segunda tentativa

acertos na terceira tentativa

perguntas com mais erros

evolução dos jogadores
```

Essas consultas ficarão principalmente em:

```text
database/queries/dashboard.sql
```

---

# 📈 Exemplos de funções SQL úteis

As consultas poderão utilizar funções como:

```sql
COUNT()
AVG()
MAX()
MIN()
SUM()
```

Além de:

```sql
GROUP BY
ORDER BY
JOIN
WHERE
```

---

# 🧠 Perguntas como dados

As perguntas não deverão ficar presas diretamente ao código Python.

Estrutura:

```text
Banco de Dados
      ↓
Pergunta
      ↓
Alternativas
      ↓
Backend
      ↓
Frontend
```

Dessa forma, será possível substituir uma pergunta no banco sem alterar a lógica do jogo.

---

# 🔄 Exemplo do fluxo de uma partida

```text
Jogador entra
      ↓
players
      ↓
partida criada
      ↓
matches
      ↓
pergunta carregada
      ↓
questions
      ↓
alternativas carregadas
      ↓
question_options
      ↓
jogador responde
      ↓
attempts
      ↓
pontuação atualizada
      ↓
matches
```

---

# 🔐 Segurança

O frontend não deverá possuir acesso administrativo direto ao banco.

Fluxo recomendado:

```text
Frontend
   ↓
Python API
   ↓
Supabase / PostgreSQL
```

Credenciais administrativas deverão permanecer apenas no backend.

Nunca deverão ser publicadas:

```text
SUPABASE_SERVICE_ROLE_KEY

DATABASE_URL real

senhas

tokens privados
```

---

# 🌱 Seeds

Os seeds poderão ser utilizados para cadastrar automaticamente:

```text
programas

30 perguntas

alternativas
```

Exemplo conceitual:

```text
Programa 01
   ↓
Pergunta 01
Pergunta 02
Pergunta 03
...
Pergunta 30
```

---

# 🔧 Alterações futuras

Caso o modelo precise mudar, as alterações deverão ser feitas de forma organizada.

Exemplo:

```text
schema inicial
      ↓
nova necessidade
      ↓
migration
      ↓
banco atualizado
```

Evitar alterações manuais sem documentação quando o projeto já estiver em desenvolvimento integrado.

---

# 👤 Responsável principal

Responsável principal pelo banco de dados:

```text
João Miguel — Gelado
```

Principais responsabilidades:

- modelagem;
- SQL;
- PostgreSQL;
- Supabase;
- PK e FK;
- relacionamentos;
- constraints;
- queries;
- integração banco ↔ backend;
- suporte ao backend;
- consultas para ranking e dashboard.

---

# 🤝 Integração com Backend

O banco e o backend deverão permanecer alinhados.

Exemplo:

```text
Banco:

players.id
players.nickname
```

O backend deverá utilizar os mesmos conceitos e tipos esperados.

Mudanças importantes no schema deverão ser comunicadas antes da integração.

---

# 🤝 Integração com Dashboard

O dashboard dependerá diretamente da qualidade dos dados armazenados.

Fluxo:

```text
PostgreSQL
    ↓
SQL Query
    ↓
Python API
    ↓
Dashboard
```

O responsável pelo banco e o responsável pelo dashboard deverão alinhar quais métricas serão necessárias.

---

# 🧪 Validação

Antes de considerar o banco pronto, deverão ser testados:

```text
INSERT

SELECT

UPDATE

DELETE

JOIN

constraints

Foreign Keys

dados inválidos

ranking

consultas do dashboard
```

---

# 📚 Documentação complementar

Uma explicação mais detalhada sobre o modelo poderá ser encontrada em:

```text
docs/banco-de-dados.md
```

As regras do jogo estão em:

```text
docs/regras-do-jogo.md
```

A arquitetura geral está em:

```text
docs/arquitetura.md
```

---

# 📌 Estado atual

Neste momento:

```text
Banco → PostgreSQL / Supabase

Modelo → definido inicialmente

Schema SQL → próxima etapa

Queries do dashboard → próxima etapa

Seeds das perguntas → etapa futura

Integração com Python → etapa futura
```

---

# ✅ Objetivo final

O banco deverá permitir que o sistema mantenha o seguinte fluxo:

```text
Jogador
   ↓
Partida
   ↓
Perguntas
   ↓
Tentativas
   ↓
Pontuação
   ↓
Histórico
   ↓
Ranking
   ↓
Dashboard
```

mantendo os dados organizados e relacionados durante toda a execução do sistema.

---

🗄️ **Pense Bem Web Database — dados organizados, integridade e suporte para toda a aplicação.**