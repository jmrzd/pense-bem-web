# 🌿 Git Workflow — Pense Bem Web

Este documento define o fluxo de trabalho com Git e GitHub utilizado pela equipe do **Pense Bem Web**.

O objetivo é manter o repositório organizado, evitar conflitos e garantir que a branch `main` permaneça estável.

---

# 🧠 Estrutura principal

A branch principal será:

```text
main
```

Ela deverá conter apenas código e documentação considerados estáveis.

Cada integrante deverá trabalhar em sua própria branch de funcionalidade.

---

# 👥 Branches da equipe

```text
feature/database
feature/dashboard
feature/frontend
feature/backend
feature/qa-docs
```

Responsabilidades:

| Branch | Responsável |
|---|---|
| `feature/database` | João Miguel — Gelado |
| `feature/dashboard` | Ibson |
| `feature/frontend` | João Pedro |
| `feature/backend` | Emanuel |
| `feature/qa-docs` | Matheus Leal |

---

# 🔄 Fluxo básico

O fluxo padrão será:

```text
main
  │
  ▼
criar/atualizar branch
  │
  ▼
desenvolver
  │
  ▼
testar
  │
  ▼
git add
  │
  ▼
git commit
  │
  ▼
git push
  │
  ▼
Pull Request
  │
  ▼
revisão
  │
  ▼
merge na main
```

---

# 📥 Atualizar o projeto local

Antes de começar uma nova tarefa, é recomendado atualizar a branch principal.

```bash
git switch main
git pull origin main
```

Isso reduz a chance de trabalhar sobre uma versão antiga do projeto.

---

# 🌱 Criar uma branch

Exemplo para banco de dados:

```bash
git switch -c feature/database
```

Exemplo para frontend:

```bash
git switch -c feature/frontend
```

O comando:

```bash
git switch -c
```

cria a nova branch e já muda para ela.

---

# 🔎 Conferir branch atual

Antes de começar alterações importantes:

```bash
git branch
```

A branch atual aparecerá marcada com:

```text
*
```

Exemplo:

```text
* feature/database
  main
```

---

# 📊 Conferir alterações

Durante o desenvolvimento:

```bash
git status
```

Esse comando permite verificar:

- arquivos modificados;
- arquivos novos;
- arquivos preparados para commit;
- branch atual.

---

# ➕ Preparar alterações

Para adicionar todos os arquivos modificados:

```bash
git add .
```

Também é possível adicionar arquivos específicos:

```bash
git add database/schema.sql
```

---

# 💾 Commits

Os commits devem representar mudanças claras e relacionadas.

Exemplo:

```bash
git commit -m "feat: adiciona schema inicial do banco"
```

Outro exemplo:

```bash
git commit -m "docs: adiciona documentação do banco"
```

---

# 📝 Padrão de commits

A equipe poderá utilizar os seguintes prefixos:

```text
feat:
fix:
docs:
test:
refactor:
style:
chore:
```

---

## `feat`

Nova funcionalidade.

```text
feat: adiciona sistema de ranking
```

---

## `fix`

Correção de problema.

```text
fix: corrige cálculo da segunda tentativa
```

---

## `docs`

Alteração em documentação.

```text
docs: atualiza arquitetura do sistema
```

---

## `test`

Criação ou alteração de testes.

```text
test: adiciona testes de pontuação
```

---

## `refactor`

Mudança interna sem alterar o comportamento esperado.

```text
refactor: reorganiza serviço de partidas
```

---

## `style`

Alterações visuais ou de formatação que não mudam a lógica.

```text
style: ajusta layout do ranking
```

---

## `chore`

Tarefas de configuração ou manutenção.

```text
chore: atualiza dependências
```

---

# 🚀 Enviar branch para o GitHub

Depois do commit:

```bash
git push -u origin feature/database
```

Na primeira vez, o `-u` conecta a branch local com a branch remota.

Depois disso, normalmente será possível utilizar apenas:

```bash
git push
```

---

# 🔀 Pull Request

Após concluir uma funcionalidade, deverá ser criado um Pull Request no GitHub.

Fluxo:

```text
feature/database
       │
       ▼
Pull Request
       │
       ▼
main
```

O Pull Request permite revisar as mudanças antes de incorporá-las à versão principal.

---

# ✅ Antes de abrir um Pull Request

Verificar:

```text
[ ] funcionalidade concluída

[ ] arquivos salvos

[ ] código testado

[ ] git status conferido

[ ] commits realizados

[ ] branch enviada ao GitHub

[ ] nenhuma credencial privada adicionada
```

---

# 🔍 Revisão

Sempre que possível, outro integrante deverá revisar o Pull Request.

A revisão poderá verificar:

- funcionamento;
- clareza;
- possíveis erros;
- conflitos;
- estrutura;
- segurança;
- impacto em outras áreas do projeto.

---

# 🔐 Arquivos que nunca devem ser enviados

Nunca enviar:

```text
.env
senhas
tokens
chaves privadas
SUPABASE_SERVICE_ROLE_KEY
credenciais do banco
```

Antes de fazer commit:

```bash
git status
```

deve ser utilizado para conferir os arquivos envolvidos.

---

# ⚠️ Trabalhar diretamente na `main`

A equipe deverá evitar desenvolver novas funcionalidades diretamente na `main`.

Preferível:

```text
main
  │
  ▼
feature/*
```

Depois:

```text
feature/*
  │
  ▼
Pull Request
  │
  ▼
main
```

---

# 🔄 Atualizar uma branch com mudanças da main

Se a `main` receber mudanças enquanto um integrante ainda estiver trabalhando:

```bash
git switch main
git pull origin main
```

Depois retornar para sua branch:

```bash
git switch feature/database
```

E integrar a versão atualizada:

```bash
git merge main
```

Caso existam conflitos, eles deverão ser resolvidos antes de continuar.

---

# ⚔️ Conflitos

Um conflito ocorre quando o Git não consegue decidir automaticamente qual alteração deve permanecer.

Exemplo:

```text
Integrante A altera uma linha

Integrante B altera a mesma linha
```

O Git poderá solicitar resolução manual.

Antes de aceitar qualquer versão, deve-se entender qual código é o correto.

Após resolver:

```bash
git add .
git commit
```

---

# 🧹 Evitar conflitos

Algumas práticas ajudam a reduzir conflitos:

- cada integrante trabalhar principalmente em sua área;
- atualizar a `main` regularmente;
- commits pequenos e claros;
- evitar várias pessoas alterando o mesmo arquivo simultaneamente;
- comunicar alterações estruturais à equipe.

---

# 🗄️ Fluxo do Banco de Dados

Exemplo:

```text
Gelado
   │
   ▼
feature/database
   │
   ├── database/schema.sql
   ├── database/queries/
   ├── database/migrations/
   └── docs/banco-de-dados.md
   │
   ▼
testes
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
main
```

---

# 🎨 Fluxo do Frontend

```text
JP
 │
 ▼
feature/frontend
 │
 ▼
React / TypeScript / Tailwind
 │
 ▼
testes
 │
 ▼
Pull Request
 │
 ▼
main
```

---

# 🐍 Fluxo do Backend

```text
Emanuel
   │
   ▼
feature/backend
   │
   ▼
Python / API
   │
   ▼
testes
   │
   ▼
Pull Request
   │
   ▼
main
```

---

# 📊 Fluxo do Dashboard

```text
Ibson
  │
  ▼
feature/dashboard
  │
  ▼
Dashboard / Ranking / Gráficos
  │
  ▼
testes
  │
  ▼
Pull Request
  │
  ▼
main
```

---

# 🧪 Fluxo de QA e documentação

```text
Matheus Leal
     │
     ▼
feature/qa-docs
     │
     ├── testes
     ├── documentação
     └── validações
     │
     ▼
Pull Request
     │
     ▼
main
```

---

# 🧩 Integração

Em determinadas etapas, duas ou mais áreas poderão precisar trabalhar juntas.

Exemplo:

```text
Frontend
   +
Backend
   +
Database
```

Nesses casos, a equipe deverá comunicar alterações em:

- rotas;
- nomes de campos;
- estrutura JSON;
- tabelas;
- nomes de colunas;
- variáveis de ambiente.

Isso reduz erros de integração.

---

# 🏷️ Exemplo de histórico organizado

```text
docs: adiciona documentação inicial

feat: adiciona schema do banco

feat: adiciona API de jogadores

feat: adiciona interface do quiz

feat: adiciona sistema de ranking

test: valida regras de pontuação

fix: corrige limite de tentativas
```

Esse histórico facilita entender a evolução do projeto.

---

# 🚫 O que evitar

```text
git commit -m "coisas"

git commit -m "teste"

git commit -m "aaa"

git commit -m "agora vai"

git commit -m "final final 2"
```

Preferir mensagens que expliquem o que mudou.

---

# 📌 Regra principal

Antes de enviar qualquer alteração:

```text
Entender
   ↓
Desenvolver
   ↓
Testar
   ↓
Conferir git status
   ↓
Commitar
   ↓
Enviar
   ↓
Abrir Pull Request
```

---

# ✅ Resultado esperado

Com esse fluxo, a equipe consegue:

- trabalhar simultaneamente;
- reduzir conflitos;
- proteger a `main`;
- revisar mudanças;
- acompanhar quem fez cada alteração;
- manter um histórico profissional;
- facilitar a integração entre as áreas.

---

🎮 **Pense Bem Web — cada integrante desenvolve sua parte, e o Git conecta tudo em um único projeto.**