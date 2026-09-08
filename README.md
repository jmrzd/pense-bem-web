<div align="center">

# 🎮 PENSE BEM WEB

### Uma releitura web e interativa do clássico Pense Bem

**React • TypeScript • Tailwind CSS • Python • Supabase • PostgreSQL**

🏆 Quiz • Ranking • Estatísticas • Dashboard • Dados reais de jogadores

</div>

---

## 📖 Sobre o projeto

O **Pense Bem Web** é um projeto acadêmico desenvolvido com o objetivo de
transformar a dinâmica clássica do **Pense Bem** em uma aplicação web moderna,
interativa e orientada a dados.

O sistema mantém a regra principal proposta na atividade acadêmica:

- cada programa possui **30 perguntas**;
- cada pergunta permite até **3 tentativas**;
- acerto na 1ª tentativa = **3 pontos**;
- acerto na 2ª tentativa = **2 pontos**;
- acerto na 3ª tentativa = **1 ponto**;
- três respostas incorretas = **0 pontos**;
- pontuação máxima por partida = **90 pontos**.

Além da lógica original do exercício em Python, o projeto será expandido
para uma aplicação web completa com:

**Frontend + Backend + Banco de Dados + Dashboard + Ranking + Deploy.**

---

## 🎯 Objetivo

O objetivo principal é aplicar, em um único projeto, conhecimentos de:

- Estrutura de Dados;
- lógica de programação;
- desenvolvimento backend com Python;
- desenvolvimento frontend;
- APIs;
- banco de dados relacional;
- SQL;
- PostgreSQL;
- Supabase;
- análise e visualização de dados;
- Git e GitHub;
- integração entre sistemas;
- deploy de aplicações web.

O projeto também foi pensado para funcionar durante a apresentação em sala,
permitindo que diferentes alunos joguem e gerem **dados reais** para o sistema.

---

# 🕹️ Como funcionará

Ao acessar a aplicação, o usuário não precisará criar conta, informar
e-mail ou cadastrar senha.

Será necessário apenas escolher um **nome ou apelido de jogador**.

```text
Digite seu nome ou apelido:

[ Gelado________________ ]

              [ JOGAR ]PLAYER
  │
  ▼
ESCOLHE O PROGRAMA
  │
  ▼
30 PERGUNTAS
  │
  ├── 1ª tentativa correta → +3 pontos
  │
  ├── 2ª tentativa correta → +2 pontos
  │
  ├── 3ª tentativa correta → +1 ponto
  │
  └── 3 erros → 0 pontos
  │
  ▼
RESULTADO FINAL
  │
  ▼
SUPABASE / POSTGRESQL
  │
  ├── salva jogador
  ├── salva partida
  ├── salva pontuação
  ├── salva tentativas
  └── salva estatísticas
  │
  ▼
DASHBOARD + RANKING

🏆 Sistema de jogadores

id | nome
---|----------------
1  | Gelado
2  | JP
3  | Ibson
4  | Emanuel
5  | Leal

Cada jogador poderá realizar várias partidas.

Ex:Gelado
│
├── Partida 01 → 68 pontos
├── Partida 02 → 79 pontos
├── Partida 03 → 86 pontos
└── Recorde     → 86 pontos

📊 Dashboard

O dashboard utilizará dados reais armazenados no banco, e não apenas
dados simulados.

Entre os indicadores planejados estão:

🏆 Ranking geral;
👑 maior pontuação;
🎮 quantidade total de partidas;
👤 quantidade de jogadores;
📈 média geral de pontuação;
🎯 percentual de acertos;
❌ perguntas com maior índice de erro;
1️⃣ acertos na primeira tentativa;
2️⃣ acertos na segunda tentativa;
3️⃣ acertos na terceira tentativa;
📊 evolução de cada jogador;
🔥 recorde pessoal;
🕹️ jogador com maior número de partidas.

Exemplo de raking:
🏆 RANKING GERAL

1º  JP        90 pontos
2º  Gelado    87 pontos
3º  Ibson     84 pontos
4º  Emanuel   81 pontos
5º  Leal      77 pontos

🧠 Arquitetura do sistema

┌─────────────────────────────────────┐
│              USUÁRIO                │
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
└──────────────────┬──────────────────┘
                   │
                   │ HTTP / API
                   ▼
┌─────────────────────────────────────┐
│              BACKEND                │
│                                     │
│ Python                              │
│ Lógica do jogo                      │
│ Controle de tentativas              │
│ Sistema de pontuação                │
│ API                                 │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│            BANCO DE DADOS           │
│                                     │
│ Supabase                            │
│ PostgreSQL                          │
│ SQL                                 │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│             DASHBOARD               │
│                                     │
│ Ranking                             │
│ Estatísticas                        │
│ Indicadores                         │
│ Histórico                           │
└─────────────────────────────────────┘

🛠️ Stack
| Área                 | Tecnologias                            |
| -------------------- | -------------------------------------- |
| 🎨 Frontend          | React, HTML                            |
| ⚡ Linguagem Frontend | TypeScript / JavaScript                |
| 💅 Estilização       | Tailwind CSS                           |
| 🐍 Backend           | Python                                 |
| 🔌 Comunicação       | API                                    |
| 🗄️ Banco de Dados   | Supabase                               |
| 🐘 SGBD              | PostgreSQL                             |
| 🧮 Consultas         | SQL                                    |
| 📊 Dados             | Dashboard e estatísticas               |
| 🌿 Versionamento     | Git                                    |
| 🐙 Repositório       | GitHub                                 |
| 🚀 Deploy            | Definido durante a etapa de integração |

🗄️ Banco de Dados

Estrutura inicial planejada:
PLAYERS
│
│ 1:N
▼
PARTIDAS
│
├───────────────┐
│               │
▼               ▼
RESPOSTAS    TENTATIVAS
│
▼
PERGUNTAS
│
▼
PROGRAMAS

Algumas entidades previstas:
players
programas
perguntas
partidas
respostas
tentativas

👥 Equipe
🗄️ João Miguel "Gelado"
Database • SQL • Supabase • GitHub • Backend Support

Responsável por:

modelagem do banco de dados;
PostgreSQL;
Supabase;
criação e manutenção das tabelas;
Primary Keys e Foreign Keys;
relacionamentos;
consultas SQL;
integração banco ↔ Python;
apoio ao backend;
estrutura e organização do repositório;
branches;
Pull Requests;
integração das contribuições no GitHub.

🎨 João Pedro — JP
Frontend Developer

Responsável por:

React;
HTML;
Tailwind CSS;
JavaScript;
TypeScript;
interface do quiz;
responsividade;
componentes;
tela inicial;
tela das perguntas;
tela de resultados;
experiência visual do jogador;
comunicação do frontend com a API.

📊 Ibson
Dashboard • Data Visualization

Responsável por:

desenvolvimento do dashboard;
visualização das estatísticas;
ranking dos jogadores;
gráficos;
indicadores;
análise das partidas;
melhor pontuação;
médias;
acertos e erros;
visualização dos dados armazenados no Supabase.

🐍 Emanuel
Backend • Python • API

Responsável por:

desenvolvimento em Python;
lógica principal do Pense Bem;
funcionamento das 30 perguntas;
controle das três tentativas;
cálculo da pontuação;
regras do jogo;
criação das rotas da API;
comunicação entre frontend e backend;
integração com o banco de dados.

🧪 Matheus Leal
QA • Documentação • Integração

Responsável por:

testes funcionais;
identificação de bugs;
validação das regras;
documentação;
apoio na integração;
organização das entregas;
acompanhamento do funcionamento geral;
apoio na preparação da apresentação.

🤝 Desenvolvimento em equipe

O desenvolvimento será realizado utilizando Git e GitHub.

Cada integrante deverá contribuir diretamente com o projeto e manter
evidências de sua participação através do histórico do repositório.

Fluxo planejado:

main
 │
 ├── frontend
 │
 ├── backend
 │
 ├── database
 │
 ├── dashboard
 │
 └── outras branches de desenvolvimento

📁 Estrutura planejada:pense-bem-web/
│
├── frontend/
│   └── aplicação React
│
├── backend/
│   └── API e lógica Python
│
├── database/
│   ├── schema.sql
│   ├── queries.sql
│   └── migrations/
│
├── dashboard/
│   └── componentes e visualizações
│
├── docs/
│   └── documentação do projeto
│
├── tests/
│   └── testes
│
├── .gitignore
│
├── requirements.txt
│
└── README.md

🔄 Fluxo de dados
Jogador
   ↓
React / TypeScript
   ↓
API Python
   ↓
Processamento da resposta
   ↓
Sistema de pontuação
   ↓
Supabase / PostgreSQL
   ↓
SQL
   ↓
Dados armazenados
   ↓
Dashboard
   ↓
Ranking e estatísticas

🧪 Cenário de demonstração 

Durante a apresentação, diferentes alunos poderão acessar o sistema e
escolher seus próprios apelidos.

Exemplo:

Jogador 1 → Ana     → 82 pontos
Jogador 2 → Pedro   → 75 pontos
Jogador 3 → Carlos  → 88 pontos
Jogador 4 → Gelado  → 84 pontos

Após as partidas, o dashboard deverá refletir automaticamente os novos dados.

1º Carlos → 88
2º Gelado → 84
3º Ana    → 82
4º Pedro  → 75

Isso permitirá demonstrar, ao vivo, o fluxo completo:

Frontend → Python → Banco de Dados → SQL → Dashboard.

🚀 Roadmap

Etapa 01 — Planejamento
 Definição da ideia
 Definição da equipe
 Definição inicial da stack
 Criação do repositório
 Autorização para desenvolvimento web

Etapa 02 — Estrutura
 Organização das branches
 Criação da estrutura de diretórios
 Documentação inicial
 Definição dos programas/perguntas

Etapa 03 — Banco de Dados
 Modelagem
 Criação do projeto Supabase
 Criação das tabelas
 PKs e FKs
 Relacionamentos
 Consultas SQL
 Testes com registros

Etapa 04 — Backend
 Estrutura Python
 Regras do quiz
 Tentativas
 Pontuação
 API
 Integração com Supabase

Etapa 05 — Frontend
 React
 Tailwind CSS
 TypeScript
 Tela inicial
 Quiz
 Resultado
 Responsividade

Etapa 06 — Dashboard
 Ranking
 Estatísticas
 Gráficos
 Recordes
 Histórico
 Dados reais do Supabase

Etapa 07 — Finalização
 Integração completa
 Testes
 Correção de bugs
 Deploy
 Documentação final
 Apresentação


📌 Status

🟡 Em desenvolvimento

Atualmente o projeto está em fase de planejamento, arquitetura,
organização da equipe e preparação da estrutura inicial do repositório.

🎓 Contexto acadêmico

Projeto desenvolvido como atividade acadêmica de Estrutura de Dados.

A proposta original exige a implementação da lógica utilizando Python.

A equipe recebeu autorização para expandir a atividade para um
sistema web, mantendo as regras e a lógica solicitadas no trabalho.

A expansão tem como objetivo aplicar os conhecimentos em um cenário
mais próximo de uma aplicação real.

⚠️ Aviso

Este é um projeto acadêmico inspirado no conceito do Pense Bem.

O projeto não possui vínculo oficial com a TecToy e é desenvolvido
exclusivamente para fins educacionais e de aprendizagem.

<div align="center">
🎮 Pense Bem Web

Aprendendo programação, banco de dados e desenvolvimento web através de um projeto real.

React • TypeScript • Python • Supabase • PostgreSQL • SQL

🏆 Que vença o melhor jogador.

</div> ```
Uma mudança que fiz de propósito

Eu não coloquei ainda Flask nem FastAPI como tecnologia confirmada, porque vocês ainda não decidiram qual framework Python vai fazer a API. Melhor um README profissional que diga apenas o que já foi decidido do que colocar tecnologia só pra depois mudar.

Também deixei dashboard/ como estrutura planejada. Quando o JP começar o React e o Ibson começar o dashboard, podemos decidir se o dashboard vai ser uma área dentro do próprio frontend/src — que provavelmente será mais organizado — em vez de uma aplicação completamente separada.

Esse README já apresenta o projeto como sistema, não como “trabalho com 30 perguntas”. Quem entrar no GitHub vai entender problema, funcionamento, arquitetura, dados, equipe e responsabilidades antes mesmo de abrir o código.












