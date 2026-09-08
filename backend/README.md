# 🐍 Backend — Pense Bem Web

Este diretório contém o backend do **Pense Bem Web**.

O backend será responsável pelas regras de negócio do jogo, comunicação com o banco de dados e fornecimento de dados para o frontend e dashboard.

---

# 🎯 Responsabilidades

O backend deverá ser responsável por:

- receber requisições do frontend;
- identificar ou criar jogadores;
- iniciar partidas;
- recuperar perguntas;
- validar respostas;
- controlar as tentativas;
- calcular a pontuação;
- finalizar partidas;
- salvar resultados;
- consultar dados no Supabase/PostgreSQL;
- fornecer dados para ranking e dashboard;
- tratar erros da aplicação.

---

# 🧠 Regras principais

Cada programa possui:

```text
30 perguntas
```

Cada pergunta permite no máximo:

```text
3 tentativas
```

Pontuação:

```text
1ª tentativa correta → 3 pontos
2ª tentativa correta → 2 pontos
3ª tentativa correta → 1 ponto
3 tentativas erradas → 0 pontos
```

Pontuação máxima:

```text
90 pontos
```

---

# 🏗️ Arquitetura

Fluxo principal:

```text
Frontend
React / TypeScript
        │
        ▼
Python API
        │
        ├── regras do jogo
        ├── validações
        ├── pontuação
        └── integração
        │
        ▼
Supabase
PostgreSQL
```

---

# 📁 Estrutura

Estrutura inicial:

```text
backend/
│
├── app/
│   ├── core/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   └── services/
│
├── .env.example
├── README.md
└── requirements.txt
```

---

# 📂 `app/core`

Responsável por configurações centrais da aplicação.

Exemplos:

- configuração do ambiente;
- conexão com serviços externos;
- constantes;
- configurações gerais.

---

# 📂 `app/routes`

Responsável pelas rotas da API.

Exemplos futuros:

```text
/players
/programs
/questions
/matches
/answers
/ranking
/dashboard
```

As rotas definitivas serão definidas durante a implementação.

---

# 📂 `app/services`

Responsável pelas regras de negócio.

Exemplos:

- cálculo de pontuação;
- controle de tentativas;
- início de partida;
- finalização de partida;
- validação das respostas;
- cálculo dos resultados.

A lógica principal do Pense Bem deverá permanecer nessa camada ou em uma estrutura equivalente definida pela equipe.

---

# 📂 `app/repositories`

Responsável pelas operações relacionadas ao banco de dados.

Exemplos:

```text
buscar player
criar player
buscar perguntas
salvar partida
salvar tentativa
buscar ranking
buscar histórico
```

Essa camada ajuda a separar a lógica SQL/banco das regras do jogo.

---

# 📂 `app/schemas`

Responsável pela estrutura dos dados recebidos e retornados pela API.

Exemplo conceitual:

```text
Player
Match
Answer
Question
Ranking
```

A implementação dependerá do framework escolhido para a API.

---

# 🐍 Framework Python

O backend utilizará Python.

O framework da API ainda não foi definido.

Possibilidades incluem:

```text
FastAPI
Flask
ou outra solução compatível
```

A decisão final será tomada pelo responsável pelo backend de acordo com as necessidades do projeto.

Responsável principal:

```text
Emanuel
```

Apoio:

```text
João Miguel — Gelado
```

---

# 🔌 Integração com o banco

O backend deverá acessar:

```text
Supabase / PostgreSQL
```

Fluxo:

```text
Python
   │
   ├── SELECT
   ├── INSERT
   ├── UPDATE
   └── consultas necessárias
        │
        ▼
PostgreSQL
```

O banco armazenará:

- players;
- programs;
- questions;
- question_options;
- matches;
- attempts.

---

# 🔐 Variáveis de ambiente

Credenciais privadas não deverão ser colocadas diretamente no código.

Arquivo local:

```text
backend/.env
```

Esse arquivo não deverá ser enviado ao GitHub.

O repositório possuirá:

```text
backend/.env.example
```

Exemplo:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

Os valores reais deverão permanecer apenas no ambiente local ou na plataforma de deploy.

---

# ⚠️ Segurança

Nunca publicar:

```text
SUPABASE_SERVICE_ROLE_KEY
senha do banco
tokens privados
chaves administrativas
```

O frontend não deverá possuir acesso a credenciais administrativas.

Fluxo recomendado:

```text
React
  ↓
Python API
  ↓
Supabase
```

---

# 🎮 Fluxo de uma partida

```text
1. Frontend envia nome/apelido

2. Backend procura o player

3. Caso não exista, cria o player

4. Backend cria uma nova partida

5. Programa é selecionado

6. Backend recupera as perguntas

7. Jogador responde uma pergunta

8. Frontend envia a resposta

9. Backend valida a tentativa

10. Backend calcula os pontos

11. Backend registra a tentativa

12. Backend retorna o resultado

13. Processo continua até a pergunta 30

14. Backend calcula o resultado final

15. Backend finaliza a partida

16. Resultado é salvo no banco

17. Frontend recebe o score final
```

---

# 🎯 Exemplo conceitual de validação

Entrada:

```text
match_id = 10
question_id = 7
selected_option = B
```

O backend deverá verificar:

```text
Qual é a tentativa atual?

A alternativa B está correta?

Quantos pontos devem ser concedidos?

A pergunta deve continuar ou ser encerrada?
```

Resultado possível:

```text
Tentativa: 2

Resposta: correta

Pontos: 2

Próxima pergunta: sim
```

---

# 🧮 Regra de pontuação

Conceitualmente:

```python
if tentativa == 1:
    pontos = 3

elif tentativa == 2:
    pontos = 2

elif tentativa == 3:
    pontos = 1
```

Esse exemplo representa apenas a ideia da regra.

A implementação real deverá também verificar se a resposta está correta e impedir tentativas inválidas.

---

# 🚫 Validações importantes

O backend deverá impedir situações como:

```text
4ª tentativa

responder uma pergunta já concluída

pontuação acima de 90

partida inexistente

pergunta inexistente

alternativa inválida

responder pergunta de outro programa

continuar uma partida já finalizada
```

---

# 📡 API

A API funcionará como ponte entre frontend e banco.

Exemplo:

```text
Frontend
   │
   │ POST resposta
   ▼
Backend
   │
   │ valida
   │ salva
   ▼
Database
   │
   ▼
Backend
   │
   │ JSON
   ▼
Frontend
```

---

# 📦 Exemplo de resposta JSON

Exemplo conceitual:

```json
{
  "correct": true,
  "attempt": 2,
  "points_awarded": 2,
  "current_score": 35,
  "question_finished": true
}
```

A estrutura definitiva poderá ser alterada durante a implementação.

---

# 🏆 Ranking

O backend poderá fornecer os dados necessários para o ranking.

Exemplo conceitual:

```text
GET /ranking
```

Resposta:

```json
[
  {
    "nickname": "Gelado",
    "score": 88
  },
  {
    "nickname": "JP",
    "score": 84
  }
]
```

O ranking deverá considerar a melhor pontuação de cada jogador.

---

# 📊 Dashboard

O backend também poderá fornecer estatísticas para o dashboard.

Exemplos:

```text
total de jogadores
total de partidas
média de pontuação
melhor score
acertos por tentativa
perguntas com mais erros
histórico de jogadores
```

Os dados virão do banco através de consultas SQL.

---

# 🧪 Testes importantes

O backend deverá ser testado principalmente nos seguintes cenários:

```text
Acerto na 1ª tentativa → 3 pontos

Erro + acerto na 2ª → 2 pontos

2 erros + acerto na 3ª → 1 ponto

3 erros → 0 pontos

4ª tentativa → bloqueada

30 perguntas → partida finalizada

Score máximo → 90

Score mínimo → 0
```

Também deverão existir testes para:

- criação de player;
- início de partida;
- registro de tentativa;
- finalização;
- integração com banco;
- ranking;
- tratamento de erros.

---

# 📦 Dependências

As dependências Python ficarão em:

```text
backend/requirements.txt
```

Esse arquivo será preenchido após a definição do framework e bibliotecas utilizadas.

Exemplo futuro:

```text
framework-api
cliente-supabase
dotenv
```

---

# ▶️ Execução local

Os comandos definitivos serão definidos após a escolha do framework.

O fluxo esperado será:

```text
entrar na pasta backend
      ↓
criar ambiente virtual
      ↓
instalar requirements
      ↓
configurar .env
      ↓
iniciar API
```

---

# 🌐 Deploy

O backend será posteriormente publicado em uma plataforma compatível com Python.

A plataforma definitiva ainda será escolhida.

Mais informações:

```text
docs/deploy.md
```

---

# 🌿 Git

O desenvolvimento principal do backend deverá ocorrer na branch:

```text
feature/backend
```

Responsável:

```text
Emanuel
```

Alterações de banco relacionadas à integração poderão envolver:

```text
feature/database
```

Responsável:

```text
João Miguel — Gelado
```

---

# 🤝 Integração com outras áreas

O backend deverá alinhar com o frontend:

```text
rotas
métodos HTTP
JSON enviado
JSON retornado
tratamento de erros
```

Com o banco:

```text
nomes das tabelas
nomes das colunas
PKs
FKs
constraints
queries
```

Com o dashboard:

```text
estatísticas disponíveis
estrutura dos dados
ranking
histórico
```

---

# 📌 Estado atual

Neste momento:

```text
Python → confirmado

Framework → ainda será definido

Banco → Supabase/PostgreSQL

Frontend → React/TypeScript

Regras do jogo → definidas

Rotas → serão definidas na implementação

Dependências → serão adicionadas posteriormente
```

---

# ✅ Objetivo final

O backend deverá funcionar como o núcleo lógico do Pense Bem Web:

```text
Receber
   ↓
Validar
   ↓
Processar
   ↓
Pontuar
   ↓
Persistir
   ↓
Responder
```

Mantendo as regras do jogo separadas da interface e dos dados armazenados.

---

🐍 **Pense Bem Web Backend — Python responsável pelas regras, integração e inteligência do jogo.**