# 🧪 Testes — Pense Bem Web

Este diretório será utilizado para organizar os testes do **Pense Bem Web**.

O objetivo dos testes é garantir que as principais regras do jogo, integrações e funcionalidades continuem funcionando corretamente durante o desenvolvimento.

---

# 👤 Responsável principal

**Matheus Leal — QA / Testes / Documentação**

Todos os integrantes também deverão testar as funcionalidades desenvolvidas em suas respectivas áreas.

---

# 🎯 Principais regras a serem testadas

A lógica principal do jogo deverá validar:

| Situação | Resultado esperado |
|---|---:|
| Acerto na 1ª tentativa | 3 pontos |
| Acerto na 2ª tentativa | 2 pontos |
| Acerto na 3ª tentativa | 1 ponto |
| Erro nas 3 tentativas | 0 pontos |
| Tentativa número 4 | Bloqueada |
| 30 acertos na primeira tentativa | 90 pontos |

---

# 🐍 Testes do Backend

Deverão ser testados:

- criação e identificação de jogadores;
- início de partidas;
- carregamento das perguntas;
- validação das respostas;
- controle das tentativas;
- cálculo da pontuação;
- bloqueio da quarta tentativa;
- finalização da partida;
- armazenamento dos resultados;
- tratamento de dados inválidos.

---

# 🗄️ Testes do Banco de Dados

Deverão ser verificados:

- Primary Keys;
- Foreign Keys;
- constraints;
- relacionamentos;
- valores `NOT NULL`;
- valores `UNIQUE`;
- limites definidos por `CHECK`;
- inserção de partidas;
- inserção de tentativas;
- consultas do ranking;
- consultas do dashboard.

O banco deverá rejeitar dados inválidos sempre que uma restrição estiver definida.

---

# 🎨 Testes do Frontend

Deverão ser testados:

- entrada do nome/apelido;
- seleção de programa;
- carregamento das perguntas;
- seleção das alternativas;
- feedback de resposta;
- exibição das tentativas;
- atualização da pontuação;
- resultado final;
- ranking;
- dashboard;
- responsividade.

---

# 📊 Testes do Dashboard

O dashboard deverá ser validado utilizando dados reais armazenados no banco.

Deverão ser conferidos:

- ranking;
- melhor pontuação;
- média de pontuação;
- total de jogadores;
- total de partidas;
- acertos por tentativa;
- perguntas com mais erros;
- histórico;
- evolução dos jogadores.

Os valores apresentados visualmente deverão corresponder aos resultados obtidos através do banco de dados.

---

# 🔗 Testes de Integração

Além das partes isoladas, deverá ser testado o fluxo completo:

```text
Jogador
   ↓
Frontend
   ↓
Backend
   ↓
Banco de Dados
   ↓
Backend
   ↓
Frontend
   ↓
Resultado / Ranking / Dashboard
```

---

# 🧪 Cenários essenciais

## Cenário 1 — Pontuação máxima

```text
30 perguntas
30 acertos na primeira tentativa

Resultado esperado:
90 pontos
```

## Cenário 2 — Segunda tentativa

```text
1ª tentativa → erro
2ª tentativa → acerto

Resultado esperado:
2 pontos
```

## Cenário 3 — Terceira tentativa

```text
1ª tentativa → erro
2ª tentativa → erro
3ª tentativa → acerto

Resultado esperado:
1 ponto
```

## Cenário 4 — Três erros

```text
1ª tentativa → erro
2ª tentativa → erro
3ª tentativa → erro

Resultado esperado:
0 pontos e próxima pergunta
```

## Cenário 5 — Quarta tentativa

```text
Tentativa solicitada:
4

Resultado esperado:
requisição bloqueada
```

## Cenário 6 — Finalização

```text
Pergunta 30 concluída

Resultado esperado:
partida finalizada
score salvo
histórico atualizado
ranking disponível
```

---

# 🐛 Registro de bugs

Ao encontrar um problema, deverá ser registrado pelo menos:

```text
Descrição do problema

Passos para reproduzir

Resultado esperado

Resultado obtido

Área afetada
```

Quando necessário, poderão ser adicionados screenshots ou logs.

---

# ✅ Checklist antes de integração

```text
[ ] Regra das 3 tentativas funcionando

[ ] Pontuação 3/2/1/0 funcionando

[ ] Score limitado corretamente

[ ] 30 perguntas funcionando

[ ] Player sendo identificado corretamente

[ ] Partidas sendo registradas

[ ] Banco mantendo integridade

[ ] Frontend comunicando com backend

[ ] Ranking retornando dados corretos

[ ] Dashboard utilizando dados reais

[ ] Nenhuma credencial privada exposta
```

---

# 📌 Objetivo

Os testes devem garantir principalmente que:

```text
Entrada
   ↓
Processamento
   ↓
Banco
   ↓
Resultado
```

produzam resultados consistentes e previsíveis.

O projeto deverá ser testado novamente sempre que alterações importantes forem integradas.

---

🧪 **Pense Bem Web — testar antes de integrar.**