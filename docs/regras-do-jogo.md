# 🎮 Regras do Jogo — Pense Bem Web

Este documento define as regras de negócio utilizadas no **Pense Bem Web**.

As perguntas e respostas poderão ser alteradas posteriormente sem modificar as regras principais do sistema.

---

## 🧠 Estrutura do jogo

Cada programa utilizado no projeto será composto por:

- 30 perguntas;
- alternativas de resposta;
- uma resposta correta por pergunta;
- no máximo 3 tentativas por pergunta.

O jogador deverá responder às perguntas sequencialmente até concluir as 30 questões do programa.

---

## 🎯 Sistema de tentativas

Cada pergunta permite no máximo **3 tentativas**.

### 1ª tentativa

Se o jogador acertar na primeira tentativa:

**+3 pontos**

A pergunta é encerrada e o sistema avança para a próxima.

### 2ª tentativa

Se a primeira resposta estiver incorreta, o jogador poderá tentar novamente.

Se acertar na segunda tentativa:

**+2 pontos**

A pergunta é encerrada e o sistema avança para a próxima.

### 3ª tentativa

Se as duas primeiras respostas estiverem incorretas, o jogador terá uma última tentativa.

Se acertar na terceira tentativa:

**+1 ponto**

### Três respostas incorretas

Caso o jogador erre as três tentativas:

**0 pontos**

O sistema encerra aquela pergunta e avança para a próxima.

---

## 🏆 Sistema de pontuação

| Resultado | Pontos |
|---|---:|
| Acerto na 1ª tentativa | 3 |
| Acerto na 2ª tentativa | 2 |
| Acerto na 3ª tentativa | 1 |
| Erro nas 3 tentativas | 0 |

Como cada programa possui 30 perguntas:

**Pontuação máxima: 90 pontos**

**Pontuação mínima: 0 pontos**

---

## 👤 Jogadores

Para iniciar uma partida, o usuário deverá informar apenas um **nome ou apelido**.

Não será obrigatório informar:

- e-mail;
- senha;
- telefone;
- endereço;
- outros dados pessoais.

Cada jogador será identificado internamente no banco de dados através de um `id` utilizado como **Primary Key (PK)**.

O nome ou apelido será utilizado para identificação visual do jogador.

---

## 🎮 Partidas

Um jogador poderá realizar várias partidas.

Exemplo:

```text
Gelado
│
├── Partida 01 → 68 pontos
├── Partida 02 → 79 pontos
├── Partida 03 → 86 pontos
└── Recorde     → 86 pontos
```

O histórico das partidas anteriores deverá permanecer armazenado no banco de dados.

---

## 💾 Registro das partidas

Ao finalizar uma partida, o sistema deverá armazenar as informações necessárias para gerar histórico, ranking e estatísticas.

Entre elas:

- jogador;
- programa jogado;
- pontuação final;
- quantidade de acertos;
- quantidade de erros;
- tentativas realizadas;
- respostas registradas;
- data e horário da partida.

---

## 🏅 Ranking

O sistema deverá permitir comparar o desempenho dos jogadores.

O ranking principal utilizará a **melhor pontuação registrada por cada jogador**.

Exemplo:

```text
🏆 RANKING GERAL

1º Ana      — 89 pontos
2º Gelado   — 87 pontos
3º JP       — 82 pontos
4º Ibson    — 78 pontos
```

Um jogador poderá realizar várias partidas sem perder seu histórico anterior.

Apenas sua melhor pontuação será considerada no ranking principal.

---

## 📊 Estatísticas

Os dados reais das partidas armazenados no banco poderão ser utilizados pelo dashboard.

Entre os indicadores planejados estão:

- ranking geral;
- melhor pontuação;
- recorde pessoal;
- média de pontuação;
- quantidade total de jogadores;
- quantidade total de partidas;
- percentual de acertos;
- percentual de erros;
- acertos na primeira tentativa;
- acertos na segunda tentativa;
- acertos na terceira tentativa;
- perguntas com maior quantidade de erros;
- jogador com maior número de partidas;
- evolução da pontuação de cada jogador;
- histórico de partidas.

As estatísticas deverão ser geradas a partir dos **dados reais dos jogadores**, armazenados no banco de dados.

---

## 🔄 Fluxo de uma pergunta

```text
PERGUNTA
   │
   ▼
Tentativa 1
   │
   ├── ACERTO → +3 → próxima pergunta
   │
   └── ERRO
         │
         ▼
     Tentativa 2
         │
         ├── ACERTO → +2 → próxima pergunta
         │
         └── ERRO
               │
               ▼
           Tentativa 3
               │
               ├── ACERTO → +1
               │
               └── ERRO → +0
                         │
                         ▼
                  próxima pergunta
```

---

## 🔄 Fluxo completo da partida

```text
Jogador informa nome/apelido
        ↓
Seleciona o programa
        ↓
Inicia a partida
        ↓
Pergunta 1
        ↓
Pergunta 2
        ↓
...
        ↓
Pergunta 30
        ↓
Calcula resultado final
        ↓
Salva partida no banco
        ↓
Atualiza estatísticas
        ↓
Exibe resultado
        ↓
Dashboard / Ranking
```

---

## 🗃️ Separação entre regras e perguntas

As regras do jogo não deverão depender diretamente do conteúdo das perguntas.

Isso permitirá substituir, atualizar ou adicionar perguntas posteriormente sem reescrever a lógica principal do backend.

As perguntas serão tratadas como **dados do sistema**.

```text
REGRAS DO JOGO
      │
      ├── Python / Backend
      │
      ├── controla tentativas
      │
      └── calcula pontuação

CONTEÚDO
      │
      ├── programas
      ├── perguntas
      ├── alternativas
      └── respostas corretas
                │
                ▼
        Supabase / PostgreSQL
```

---

## 📚 Conteúdo das perguntas

As 30 perguntas e seus respectivos gabaritos serão adicionados posteriormente ao banco de dados após a definição do conteúdo definitivo utilizado pela equipe.

Dessa forma, será possível alterar o conteúdo das perguntas sem modificar a lógica principal do sistema.

---

## 📌 Resumo das regras

```text
30 perguntas por programa
        +
3 tentativas por pergunta
        ↓
1ª tentativa → 3 pontos
2ª tentativa → 2 pontos
3ª tentativa → 1 ponto
3 erros       → 0 pontos
        ↓
Máximo = 90 pontos
        ↓
Resultado salvo no banco
        ↓
Ranking + Estatísticas + Dashboard
```

---

🎮 **Pense Bem Web — lógica, competição e dados em uma experiência web interativa.**