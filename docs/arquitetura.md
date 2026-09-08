# 🧠 Arquitetura do Sistema — Pense Bem Web

Este documento descreve a arquitetura inicial do **Pense Bem Web**, a responsabilidade de cada camada e o fluxo dos dados dentro da aplicação.

O projeto será desenvolvido como uma aplicação web dividida em **Frontend, Backend, Banco de Dados e Dashboard**.

---

## 🏗️ Visão geral

```text
┌─────────────────────────────────────┐
│               PLAYER                │
│          Nome ou apelido            │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│              FRONTEND               │
│                                     │
│ React                               │
│ TypeScript / JavaScript             │
│ Tailwind CSS                        │
│ HTML                                │
│                                     │
│ Responsável: JP                     │
└──────────────────┬──────────────────┘
                   │
                   │ HTTP / API
                   ▼
┌─────────────────────────────────────┐
│               BACKEND               │
│                                     │
│ Python                              │
│ API                                 │
│ Regras do jogo                      │
│ Sistema de tentativas               │
│ Sistema de pontuação                │
│                                     │
│ Responsável: Emanuel                │
│ Apoio: Gelado                       │
└──────────────────┬──────────────────┘
                   │
                   │ Consultas / Persistência
                   ▼
┌─────────────────────────────────────┐
│           BANCO DE DADOS            │
│                                     │
│ Supabase                            │
│ PostgreSQL                          │
│ SQL                                 │
│                                     │
│ Responsável: Gelado                 │
└──────────────────┬──────────────────┘
                   │
                   │ Dados reais
                   ▼
┌─────────────────────────────────────┐
│              DASHBOARD              │
│                                     │
│ Ranking                             │
│ Estatísticas                        │
│ Gráficos                            │
│ Histórico                           │
│ Recordes                            │
│                                     │
│ Responsável: Ibson                  │
└─────────────────────────────────────┘

            Testes e documentação
                     │
                     ▼
                Matheus Leal
```

---

# 🎨 Frontend

O frontend será responsável pela interação entre o jogador e o sistema.

## Tecnologias

- React;
- TypeScript;
- JavaScript;
- HTML;
- Tailwind CSS.

## Responsabilidades

O frontend deverá possuir inicialmente:

- tela inicial;
- identificação do jogador por nome ou apelido;
- seleção do programa;
- tela das perguntas;
- alternativas;
- indicação da pergunta atual;
- feedback das tentativas;
- pontuação;
- tela de resultado;
- acesso ao ranking;
- acesso às estatísticas;
- responsividade para computadores e dispositivos móveis.

O frontend **não deverá possuir acesso direto a credenciais privadas do banco de dados**.

A comunicação com as regras principais do sistema deverá ocorrer através da API do backend.

---

# 🐍 Backend

O backend será responsável pelas regras de negócio e pela comunicação entre o frontend e o banco de dados.

## Tecnologia

- Python.

O framework utilizado para construção da API será definido durante a implementação.

## Responsabilidades

O backend será responsável por:

- receber requisições do frontend;
- iniciar partidas;
- recuperar perguntas;
- validar respostas;
- controlar as três tentativas;
- calcular a pontuação;
- finalizar partidas;
- registrar resultados;
- consultar dados necessários;
- comunicar-se com o Supabase/PostgreSQL;
- retornar informações ao frontend.

---

# 🎯 Lógica do quiz

A lógica principal permanecerá no backend.

```text
Resposta recebida
       ↓
Backend identifica a pergunta
       ↓
Verifica a tentativa atual
       ↓
Compara com a resposta correta
       ↓
┌───────────────┬────────────────┐
│    ACERTO     │      ERRO      │
│               │                │
│ calcula       │ próxima        │
│ pontuação     │ tentativa      │
└───────┬───────┴───────┬────────┘
        │               │
        └───────┬───────┘
                ↓
       Registra resultado
```

A pontuação seguirá:

```text
1ª tentativa correta → 3 pontos
2ª tentativa correta → 2 pontos
3ª tentativa correta → 1 ponto
3 tentativas erradas → 0 pontos
```

---

# 🗄️ Banco de Dados

O banco de dados utilizará:

- Supabase;
- PostgreSQL;
- SQL.

O Supabase será utilizado como plataforma para disponibilização e gerenciamento do banco PostgreSQL.

## Dados previstos

O banco deverá armazenar informações relacionadas a:

- players;
- programas;
- perguntas;
- alternativas;
- partidas;
- tentativas;
- respostas;
- pontuações;
- datas e horários.

A modelagem completa será documentada em:

`docs/banco-de-dados.md`

E implementada inicialmente em:

`database/schema.sql`

---

# 🔑 Identificação dos jogadores

O usuário não precisará possuir uma conta tradicional.

Não serão necessários:

- e-mail;
- senha;
- telefone.

O jogador utilizará apenas um **nome ou apelido**.

Internamente, cada player possuirá um identificador único:

```text
players

id (PK)
nickname
created_at
```

O `id` será utilizado nos relacionamentos do banco de dados.

Exemplo:

```text
PLAYERS
   │
   │ 1:N
   ▼
PARTIDAS
```

Dessa forma, um jogador poderá possuir várias partidas.

---

# 📊 Dashboard

O dashboard será integrado ao sistema web e utilizará **dados reais das partidas armazenadas no banco**.

Inicialmente, ele ficará dentro da aplicação frontend:

`frontend/src/dashboard/`

O dashboard poderá apresentar:

- ranking geral;
- melhor pontuação por jogador;
- recordes;
- número de jogadores;
- número de partidas;
- média de pontuação;
- acertos;
- erros;
- desempenho por tentativa;
- perguntas com maior índice de erro;
- evolução dos jogadores;
- histórico de partidas.

O dashboard deverá receber apenas os dados necessários para apresentação das informações.

---

# 🔄 Fluxo principal de dados

```text
PLAYER
  │
  │ informa nome/apelido
  ▼
FRONTEND
React + TypeScript
  │
  │ requisição HTTP
  ▼
BACKEND
Python / API
  │
  │ aplica regras
  │ valida respostas
  │ calcula pontuação
  ▼
SUPABASE
PostgreSQL
  │
  │ armazena dados
  ▼
BACKEND
  │
  │ retorna resultado
  ▼
FRONTEND
  │
  ├── Resultado da partida
  │
  └── Dashboard / Ranking
```

---

# 🎮 Fluxo de uma partida

```text
1. Jogador acessa o sistema

2. Digita nome/apelido

3. Frontend solicita início da partida

4. Backend identifica/cria o player

5. Programa é selecionado

6. Backend recupera as perguntas

7. Jogador responde às 30 perguntas

8. Backend controla tentativas e pontuação

9. Dados da partida são registrados

10. Partida é finalizada

11. Resultado é retornado ao frontend

12. Ranking e estatísticas podem ser atualizados
```

---

# 📁 Organização das camadas

```text
pense-bem-web/
│
├── frontend/
│   └── interface e dashboard
│
├── backend/
│   └── API e regras de negócio
│
├── database/
│   └── SQL, schema, queries e migrations
│
├── docs/
│   └── documentação técnica
│
└── tests/
    └── testes do sistema
```

Cada camada possui uma responsabilidade específica.

Isso reduz o acoplamento e facilita o desenvolvimento em equipe.

---

# 🔌 Integração Frontend ↔ Backend

O frontend não deverá implementar diretamente as regras principais de pontuação.

Exemplo conceitual:

```text
React
   │
   │ "player respondeu alternativa B"
   ▼
Python API
   │
   │ valida
   │ calcula
   │ registra
   ▼
Resposta da API
   │
   ▼
React atualiza a interface
```

Dessa forma, a regra principal permanece centralizada no backend.

---

# 🔌 Integração Backend ↔ Banco

O Python será responsável pela comunicação segura com o banco quando forem necessárias operações do backend.

```text
Python
   │
   ├── INSERT
   ├── SELECT
   ├── UPDATE
   └── consultas necessárias
        │
        ▼
Supabase / PostgreSQL
```

As consultas SQL específicas do dashboard poderão ser documentadas em:

`database/queries/dashboard.sql`

---

# 🔐 Segurança

Credenciais privadas nunca deverão ser armazenadas diretamente no código ou enviadas ao GitHub.

Exemplo:

```text
❌ ERRADO

SUPABASE_SERVICE_ROLE_KEY = "chave-real-aqui"
```

As credenciais deverão utilizar variáveis de ambiente.

```text
backend/.env
```

O arquivo `.env` deverá permanecer ignorado pelo Git.

O repositório poderá possuir:

```text
backend/.env.example
```

contendo apenas os nomes das variáveis necessárias, sem valores secretos.

---

# 🌐 Deploy

O sistema será preparado para funcionar fora do ambiente local.

A arquitetura de deploy poderá ser dividida em:

```text
GitHub
   │
   ├───────────────┐
   ▼               ▼
Frontend         Backend
   │               │
   ▼               ▼
Hospedagem      Hospedagem Python
   │               │
   └───────┬───────┘
           ▼
       Supabase
       PostgreSQL
```

As plataformas definitivas serão registradas em:

`docs/deploy.md`

---

# 🧪 Testes

Antes da integração de funcionalidades na branch `main`, deverão ser testados principalmente:

- cálculo da pontuação;
- limite de três tentativas;
- avanço entre perguntas;
- finalização após 30 perguntas;
- criação/identificação de players;
- armazenamento das partidas;
- ranking;
- consultas do dashboard;
- comunicação frontend/backend;
- comportamento em caso de erro.

Matheus Leal ficará responsável pela área principal de QA, com participação dos demais integrantes nas funcionalidades desenvolvidas por cada um.

---

# 🌿 Git e GitHub

O código será versionado utilizando Git e GitHub.

```text
feature/*
     │
     ▼
commit
     │
     ▼
push
     │
     ▼
Pull Request
     │
     ▼
revisão
     │
     ▼
main
```

A `main` deverá representar a versão estável do sistema.

As regras completas estão documentadas em:

`CONTRIBUTING.md`

---

# 🧩 Princípio da arquitetura

O objetivo da arquitetura é manter cada responsabilidade separada:

```text
Frontend  → apresenta e recebe interação

Backend   → processa as regras

Database  → persiste os dados

Dashboard → transforma dados em informação

Tests     → valida o funcionamento

GitHub    → organiza e versiona o desenvolvimento
```

Essa separação permitirá que cada integrante desenvolva sua área e que todas as partes sejam posteriormente integradas em um único sistema.

---

🎮 **Pense Bem Web — Frontend, Backend, Dados e Dashboard trabalhando como um único sistema.**