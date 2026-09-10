# 🎨 Frontend — Pense Bem Web

Este diretório contém o frontend do **Pense Bem Web**.

O frontend será responsável pela interface visual da aplicação, interação com o jogador e exibição dos dados recebidos do backend.

---

# 🧠 Tecnologias

O frontend será desenvolvido utilizando:

- React;
- TypeScript;
- JavaScript;
- HTML;
- Tailwind CSS.

---

# 🎯 Responsabilidades

O frontend deverá ser responsável por:

- tela inicial;
- identificação do jogador;
- seleção de programa;
- exibição das perguntas;
- exibição das alternativas;
- controle visual das tentativas;
- exibição da pontuação;
- tela de resultado;
- ranking;
- dashboard;
- responsividade;
- integração com a API Python.

---

# 🏗️ Arquitetura

Fluxo principal:

```text
Jogador
   │
   ▼
Frontend
React / TypeScript / Tailwind
   │
   │ requisições HTTP
   ▼
Backend
Python API
   │
   ▼
Supabase / PostgreSQL
```

O frontend deverá receber os dados processados pelo backend e apresentá-los ao jogador.

---

# 📁 Estrutura inicial

```text
frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── dashboard/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── types/
│
└── README.md
```

A estrutura poderá evoluir durante o desenvolvimento.

---

# 📂 `src/assets`

Diretório destinado a recursos visuais utilizados pela aplicação.

Exemplos:

```text
imagens
ícones
logos
fontes autorizadas
outros recursos visuais
```

Materiais protegidos por direitos autorais não deverão ser utilizados sem autorização.

---

# 📂 `src/components`

Deverá armazenar componentes reutilizáveis.

Exemplos:

```text
Button
QuestionCard
ScoreCard
RankingTable
Navbar
Loading
ErrorMessage
```

O objetivo é evitar repetição de código e facilitar a manutenção da interface.

---

# 📂 `src/pages`

Deverá armazenar as páginas principais da aplicação.

Possíveis páginas:

```text
Home
ProgramSelection
Quiz
Result
Ranking
Dashboard
```

Os nomes definitivos poderão ser alterados durante a implementação.

---

# 📂 `src/dashboard`

Área destinada aos componentes e telas relacionados ao dashboard.

Responsável principal:

```text
Ibson
```

Poderá conter:

- cards de indicadores;
- gráficos;
- ranking;
- histórico;
- estatísticas;
- evolução dos jogadores.

O dashboard deverá utilizar dados reais armazenados no banco.

---

# 📂 `src/services`

Responsável pela comunicação com a API.

Exemplos:

```text
playerService
quizService
rankingService
dashboardService
```

Essa camada poderá centralizar chamadas HTTP para o backend.

Fluxo:

```text
Component
   │
   ▼
Service
   │
   ▼
Python API
```

---

# 📂 `src/hooks`

Poderá armazenar hooks personalizados utilizados pela aplicação.

Exemplos futuros:

```text
usePlayer
useQuiz
useRanking
useDashboard
```

Hooks deverão ser utilizados quando realmente ajudarem a reutilizar ou organizar lógica do frontend.

---

# 📂 `src/types`

Poderá armazenar tipos e interfaces TypeScript.

Exemplo conceitual:

```typescript
interface Player {
  id: number;
  nickname: string;
}
```

Outro exemplo:

```typescript
interface Question {
  id: number;
  questionNumber: number;
  prompt: string;
}
```

Os tipos definitivos deverão acompanhar os dados fornecidos pela API.

---

# 📂 `src/styles`

Poderá conter estilos globais ou configurações adicionais.

A estilização principal utilizará:

```text
Tailwind CSS
```

---

# 👤 Identificação do jogador

O jogador não precisará criar uma conta tradicional.

A tela inicial deverá solicitar apenas:

```text
Nome ou apelido
```

Exemplo:

```text
Digite seu nome ou apelido:

[ Gelado              ]

        [ JOGAR ]
```

O frontend enviará esse valor para o backend.

---

# 🎮 Tela do quiz

A tela do quiz deverá apresentar informações claras para o jogador.

Exemplo conceitual:

```text
┌────────────────────────────────────┐
│           PENSE BEM WEB            │
│                                    │
│ Pergunta 07 / 30                   │
│                                    │
│ Qual é a capital do Brasil?        │
│                                    │
│ [ A ] Rio de Janeiro              │
│ [ B ] São Paulo                   │
│ [ C ] Brasília                    │
│ [ D ] Salvador                    │
│                                    │
│ Tentativa: 1 de 3                 │
│ Pontuação: 18                     │
└────────────────────────────────────┘
```

---

# 🎯 Tentativas

O frontend deverá informar visualmente ao jogador quantas tentativas ainda estão disponíveis.

Exemplo:

```text
Tentativa 1 de 3
```

Após um erro:

```text
Resposta incorreta.

Tentativa 2 de 3
```

O controle real das tentativas deverá permanecer no backend.

---

# 🏆 Pontuação

O frontend poderá apresentar a pontuação atual durante a partida.

Regras:

```text
1ª tentativa correta → +3

2ª tentativa correta → +2

3ª tentativa correta → +1

3 erros → +0
```

O backend será responsável por calcular a pontuação.

O frontend apenas exibirá o valor retornado.

---

# ✅ Feedback de resposta

Após responder, a interface poderá informar:

```text
Correto! +3 pontos
```

ou:

```text
Resposta incorreta.
Você ainda possui 2 tentativas.
```

A experiência deverá ser simples e rápida para não interromper o ritmo do jogo.

---

# 🏁 Resultado final

Depois das 30 perguntas, deverá existir uma tela de resultado.

Exemplo:

```text
🏆 PARTIDA FINALIZADA

Jogador: Gelado

Pontuação:
82 / 90

Acertos:
28 / 30

[ JOGAR NOVAMENTE ]

[ VER RANKING ]

[ DASHBOARD ]
```

---

# 🥇 Ranking

O frontend deverá possuir uma interface para apresentação do ranking.

Exemplo:

```text
🏆 RANKING

1º Gelado  — 88 pontos
2º JP      — 84 pontos
3º Ibson   — 80 pontos
4º Emanuel — 78 pontos
```

O ranking deverá utilizar os dados fornecidos pelo backend.

---

# 📊 Dashboard

O dashboard poderá apresentar indicadores como:

```text
Melhor score

Média de pontuação

Total de jogadores

Total de partidas

Taxa de acertos

Perguntas mais difíceis
```

Além de gráficos de:

```text
evolução dos jogadores

acertos por tentativa

erros por pergunta

histórico de partidas
```

---

# 🔌 Integração com a API

O frontend deverá consumir a API Python.

Fluxo conceitual:

```text
React
   │
   │ HTTP
   ▼
Python API
   │
   ▼
PostgreSQL
```

O frontend não deverá acessar diretamente credenciais administrativas do banco.

---

# 📡 Exemplo conceitual de requisição

O frontend poderá enviar algo semelhante a:

```json
{
  "match_id": 10,
  "question_id": 7,
  "selected_option": "B"
}
```

E receber:

```json
{
  "correct": true,
  "attempt": 2,
  "points_awarded": 2,
  "current_score": 35,
  "question_finished": true
}
```

Essas estruturas são apenas exemplos.

A API definitiva será alinhada entre frontend e backend.

---

# 🔐 Segurança

Nunca deverão existir no frontend:

```text
SUPABASE_SERVICE_ROLE_KEY

senha do banco

tokens administrativos

credenciais privadas
```

Qualquer informação existente no bundle do frontend poderá ser inspecionada pelo navegador.

Por isso, credenciais privadas deverão permanecer no backend.

---

# 🌐 Variável da API

O endereço da API poderá ser configurado através de variável de ambiente.

Exemplo conceitual:

```env
VITE_API_URL=
```

Em desenvolvimento:

```text
http://localhost:8000
```

Em produção:

```text
https://api-do-projeto.exemplo.com
```

A porta e o endereço definitivos dependerão da implementação.

---

# 📱 Responsividade

A aplicação deverá funcionar corretamente em diferentes tamanhos de tela.

Prioridades:

- notebooks;
- desktops;
- tablets;
- celulares.

A interface do quiz deverá continuar simples e legível mesmo em telas menores.

---

# ♿ Usabilidade

A interface deverá priorizar:

- textos legíveis;
- botões claros;
- contraste adequado;
- navegação simples;
- feedback visual;
- estados de carregamento;
- mensagens de erro compreensíveis.

---

# ⏳ Loading

Durante requisições ao backend, o frontend deverá apresentar algum feedback visual.

Exemplo:

```text
Carregando pergunta...
```

Isso evita que o jogador pense que o sistema travou.

---

# ⚠️ Tratamento de erros

O frontend deverá lidar com situações como:

```text
API indisponível

erro ao carregar perguntas

erro ao salvar partida

partida não encontrada

falha de conexão
```

Exemplo:

```text
Não foi possível carregar a próxima pergunta.
Tente novamente.
```

---

# 🚫 Regras que não devem ficar apenas no frontend

O frontend poderá ajudar a bloquear ações visualmente, mas regras críticas não deverão depender apenas dele.

Exemplo:

```text
máximo de 3 tentativas
score máximo de 90
validação da resposta
finalização da partida
```

Essas regras devem ser validadas pelo backend.

---

# 🧪 Testes

O frontend deverá ser testado em cenários como:

```text
entrada de nickname

carregamento das perguntas

seleção de alternativa

feedback correto/incorreto

mudança de pergunta

pontuação exibida

fim da partida

ranking

dashboard

responsividade
```

Também deverão ser avaliados estados de:

```text
loading

erro

API indisponível

dados vazios
```

---

# 🌿 Git

O desenvolvimento principal do frontend deverá ocorrer na branch:

```text
feature/frontend
```

Responsável:

```text
João Pedro
```

O dashboard será desenvolvido principalmente em:

```text
feature/dashboard
```

Responsável:

```text
Ibson
```

Como ambos fazem parte da interface React, haverá integração entre essas duas áreas.

---

# 🤝 Integração com Backend

Frontend e backend deverão combinar principalmente:

```text
URL das rotas

métodos HTTP

campos enviados

campos retornados

códigos de erro

estrutura JSON
```

Exemplo:

```text
Frontend:
"vou enviar selected_option"

Backend:
"vou receber selected_option"
```

Os nomes devem ser iguais entre as duas camadas.

---

# 🤝 Integração com Dashboard

O frontend deverá permitir que os componentes do dashboard utilizem dados provenientes da API.

Exemplo:

```text
Dashboard Component
       │
       ▼
dashboardService
       │
       ▼
Backend API
       │
       ▼
Queries SQL
       │
       ▼
PostgreSQL
```

---

# 🧩 Separação de responsabilidades

```text
components
     ↓
interface reutilizável

pages
     ↓
telas principais

services
     ↓
comunicação com API

types
     ↓
tipos TypeScript

dashboard
     ↓
estatísticas e gráficos
```

Essa separação ajuda a manter o frontend organizado à medida que o projeto cresce.

---

# 🚀 Deploy

O frontend poderá futuramente ser publicado em uma plataforma compatível com React.

Possibilidades:

```text
Vercel
Netlify
ou equivalente
```

A plataforma definitiva ainda será definida.

Mais informações:

```text
docs/deploy.md
```

---

# 📌 Estado atual

Neste momento:

```text
React → definido

TypeScript → definido

Tailwind CSS → definido

Backend → Python API

Banco → Supabase/PostgreSQL

Layout final → será desenvolvido

API definitiva → será definida durante a integração
```

---

# ✅ Objetivo final

O frontend deverá transformar a lógica do sistema em uma experiência simples e intuitiva:

```text
Ver
 ↓
Interagir
 ↓
Responder
 ↓
Receber feedback
 ↓
Acompanhar pontuação
 ↓
Finalizar partida
 ↓
Ver ranking e estatísticas
```

---

🎨 **Pense Bem Web Frontend — uma interface moderna para transformar a lógica do Pense Bem em uma experiência web interativa.**
