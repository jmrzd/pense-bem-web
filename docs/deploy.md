# 🚀 Deploy — Pense Bem Web

Este documento descreve a estratégia inicial de publicação do **Pense Bem Web**.

O objetivo do deploy é disponibilizar o sistema na internet para que jogadores possam acessar o quiz, realizar partidas e visualizar ranking e dashboard sem depender do ambiente local dos desenvolvedores.

---

# 🧠 Visão geral

A aplicação será dividida em três partes principais:

```text
Frontend
   ↓
Backend
   ↓
Banco de Dados
```

Estrutura esperada:

```text
GitHub
   │
   ├───────────────┐
   │               │
   ▼               ▼
Frontend         Backend
React            Python API
   │               │
   └───────┬───────┘
           ▼
        Supabase
      PostgreSQL
```

---

# 🌐 Frontend

O frontend será desenvolvido utilizando:

- React;
- TypeScript;
- Tailwind CSS;
- HTML;
- JavaScript.

A publicação do frontend poderá ser realizada inicialmente através de plataformas como:

- Vercel;
- Netlify;
- outra plataforma compatível com aplicações React.

A plataforma definitiva será escolhida durante a implementação.

---

# 🐍 Backend

O backend será desenvolvido em Python.

O framework da API ainda será definido pelo responsável pelo backend.

A hospedagem deverá possuir suporte para aplicações Python e permitir:

- execução da API;
- instalação das dependências;
- configuração de variáveis de ambiente;
- comunicação com o Supabase/PostgreSQL;
- acesso público através de HTTPS.

Possíveis plataformas:

- Render;
- Railway;
- outras plataformas compatíveis com Python.

A escolha definitiva será realizada após a definição da tecnologia utilizada no backend.

---

# 🗄️ Banco de Dados

O banco de dados será hospedado utilizando:

```text
Supabase
```

O Supabase fornecerá o banco:

```text
PostgreSQL
```

O banco armazenará:

- jogadores;
- programas;
- perguntas;
- alternativas;
- partidas;
- tentativas;
- pontuações;
- histórico;
- dados utilizados pelo dashboard.

---

# 🔄 Fluxo em produção

Quando o sistema estiver publicado, o fluxo esperado será:

```text
Jogador
   │
   ▼
URL pública do Frontend
   │
   ▼
React
   │
   │ HTTPS
   ▼
Python API
   │
   │ conexão segura
   ▼
Supabase / PostgreSQL
```

Depois do processamento:

```text
Supabase
   │
   ▼
Backend Python
   │
   ▼
Frontend
   │
   ▼
Jogador
```

---

# 🔐 Variáveis de ambiente

Informações privadas não deverão ser armazenadas diretamente no código.

Exemplos:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
```

Esses valores deverão ser configurados através de variáveis de ambiente na plataforma de hospedagem.

---

# ⚠️ Arquivo `.env`

Durante o desenvolvimento local, as credenciais poderão ser armazenadas em:

```text
backend/.env
```

Esse arquivo NÃO deverá ser enviado ao GitHub.

O repositório poderá possuir:

```text
backend/.env.example
```

Exemplo:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

Sem valores reais.

---

# 🔒 Segurança das credenciais

Nunca deverão ser publicados:

- senha do banco;
- Service Role Key;
- tokens administrativos;
- chaves privadas;
- credenciais de serviços externos.

Especialmente:

```text
SUPABASE_SERVICE_ROLE_KEY
```

Essa chave deverá permanecer exclusivamente em ambiente seguro do backend.

Ela nunca deverá ser enviada para o frontend.

---

# 🎨 Frontend e variáveis públicas

Caso o frontend utilize alguma variável de ambiente pública, ela deverá conter apenas informações que possam aparecer no navegador.

Credenciais administrativas jamais deverão estar presentes no código React.

Fluxo recomendado:

```text
React
   ↓
Python API
   ↓
Supabase
```

E não:

```text
React
   ↓
Service Role Key
   ↓
Supabase
```

---

# 🔗 URLs da aplicação

Quando o deploy estiver concluído, o projeto poderá possuir URLs semelhantes a:

```text
Frontend:
https://pense-bem-web.vercel.app
```

```text
Backend:
https://pense-bem-api.exemplo.com
```

Esses endereços são apenas exemplos.

As URLs reais serão registradas neste documento após o deploy.

---

# 🔌 Configuração Frontend → Backend

O frontend precisará conhecer o endereço público da API.

Durante desenvolvimento local:

```text
http://localhost:8000
```

ou outra porta utilizada pelo backend.

Em produção:

```text
https://api-do-projeto.exemplo.com
```

O endereço deverá preferencialmente ser configurado através de variável de ambiente.

Exemplo conceitual:

```env
VITE_API_URL=
```

O nome definitivo dependerá da configuração do frontend.

---

# 🧪 Ambientes

O projeto poderá trabalhar inicialmente com dois ambientes:

## Desenvolvimento

Executado nos computadores dos integrantes.

Exemplo:

```text
Frontend → localhost
Backend  → localhost
Database → Supabase
```

## Produção

Versão publicada do sistema.

```text
Frontend → hospedagem pública
Backend  → hospedagem pública
Database → Supabase
```

---

# 🌿 GitHub e deploy

O GitHub será utilizado como fonte principal do código.

Fluxo esperado:

```text
feature/*
    │
    ▼
Pull Request
    │
    ▼
main
    │
    ▼
Deploy
```

A branch:

```text
main
```

deverá representar a versão estável do sistema.

---

# 🔁 Deploy automático

Caso a plataforma utilizada permita integração com GitHub, poderá ser configurado deploy automático.

Exemplo:

```text
Merge na main
      │
      ▼
GitHub
      │
      ▼
Plataforma detecta atualização
      │
      ▼
Build
      │
      ▼
Deploy
```

Isso reduz a necessidade de publicar manualmente cada nova versão.

---

# 🧱 Build do Frontend

Antes da publicação, o frontend React deverá ser compilado.

Fluxo conceitual:

```text
Código React
   │
   ▼
Instala dependências
   │
   ▼
Build
   │
   ▼
Arquivos prontos para produção
   │
   ▼
Hospedagem
```

Os comandos definitivos serão documentados quando a estrutura React estiver criada.

**Atualização:** a estrutura React já existe em `frontend/`. Os comandos reais são:

```bash
cd frontend
npm install
npm run build
```

O build gera os arquivos estáticos em `frontend/dist/`, prontos para qualquer hospedagem de site estático.

---

# ▲ Publicando o Frontend na Vercel

Passo a passo real (a plataforma escolhida foi a Vercel):

1. Acesse [vercel.com](https://vercel.com) e faça login com a conta do GitHub que tem acesso a este repositório.
2. Clique em **Add New → Project** e importe o repositório `pense-bem-web`.
3. Em **Root Directory**, selecione `frontend` (o projeto React está dentro dessa subpasta, não na raiz do repositório).
4. A Vercel detecta automaticamente que é um projeto Vite — os campos **Build Command** (`npm run build`) e **Output Directory** (`dist`) já vêm preenchidos corretamente. Já existe também um `frontend/vercel.json` com a regra de rewrite para SPA (evita erro 404 ao recarregar rotas como `/ranking` ou `/dashboard`).
5. (Opcional) Em **Environment Variables**, adicione `VITE_ADMIN_CODE` com o código de acesso à área administrativa (`/dashboard`) — veja `frontend/.env.example`. Se não configurar, é usado um código padrão de desenvolvimento.
6. Clique em **Deploy**. A partir daí, todo push na branch `main` gera um novo deploy automático.

Depois do primeiro deploy, a Vercel gera uma URL pública (algo como `https://pense-bem-web.vercel.app`) — atualize a seção "🔗 URLs da aplicação" acima com o endereço real.

---

# 🐍 Inicialização do Backend

O backend precisará possuir:

- arquivo principal da aplicação;
- lista de dependências;
- comando de inicialização;
- variáveis de ambiente configuradas.

Exemplo de estrutura:

```text
backend/
│
├── app/
├── requirements.txt
├── .env.example
└── README.md
```

O comando de inicialização dependerá do framework escolhido pelo Emanuel.

Por isso, neste momento não será definido um comando específico.

---

# 📦 Dependências do Backend

As dependências Python serão registradas em:

```text
backend/requirements.txt
```

Exemplo conceitual:

```text
biblioteca-da-api
biblioteca-supabase
biblioteca-env
```

Os nomes reais serão adicionados após a definição do backend.

---

# 🗃️ Banco em produção

O banco do Supabase deverá possuir:

- tabelas criadas;
- Foreign Keys configuradas;
- restrições;
- índices;
- programas cadastrados;
- perguntas cadastradas;
- alternativas cadastradas.

A estrutura SQL principal ficará versionada em:

```text
database/schema.sql
```

---

# 🌱 Dados iniciais

Os dados iniciais do jogo poderão ser inseridos através de arquivos localizados em:

```text
database/seeds/
```

Exemplo:

```text
database/seeds/program_01.sql
```

Esses arquivos poderão cadastrar:

- programa;
- 30 perguntas;
- alternativas;
- respostas corretas.

---

# 🔄 Atualizações do Banco

Mudanças estruturais futuras deverão preferencialmente ser registradas através de migrations.

Pasta:

```text
database/migrations/
```

Exemplo:

```text
001_initial_schema.sql
002_add_indexes.sql
003_update_questions.sql
```

Isso permite acompanhar a evolução do banco através do Git.

---

# 🛡️ CORS

Como o frontend e o backend poderão estar hospedados em endereços diferentes, o backend deverá configurar corretamente as regras de CORS.

Exemplo:

```text
Frontend:
https://pense-bem-web.exemplo.com

Backend:
https://pense-bem-api.exemplo.com
```

A API deverá permitir requisições provenientes do frontend autorizado.

Em produção, deve-se evitar permitir origens desnecessárias.

---

# 🔐 HTTPS

As aplicações publicadas deverão utilizar:

```text
HTTPS
```

Isso protege a comunicação entre:

```text
Jogador
   ↕
Frontend
   ↕
Backend
```

As principais plataformas modernas de hospedagem normalmente fornecem HTTPS automaticamente.

---

# 🧪 Testes antes do deploy

Antes de publicar uma nova versão, deverão ser testados:

- inicialização do frontend;
- inicialização do backend;
- comunicação frontend/backend;
- comunicação backend/banco;
- criação de jogador;
- início de partida;
- carregamento das perguntas;
- sistema de tentativas;
- cálculo da pontuação;
- finalização da partida;
- armazenamento dos resultados;
- ranking;
- dashboard;
- comportamento em dispositivos diferentes.

---

# ✅ Checklist de deploy

Antes da publicação:

```text
[ ] Código atualizado na main

[ ] Frontend funcionando localmente

[ ] Backend funcionando localmente

[ ] Banco criado no Supabase

[ ] Schema aplicado

[ ] Perguntas cadastradas

[ ] Variáveis de ambiente configuradas

[ ] Nenhuma chave privada no GitHub

[ ] Comunicação frontend/backend funcionando

[ ] Comunicação backend/banco funcionando

[ ] CORS configurado

[ ] Testes principais aprovados

[ ] URLs de produção configuradas

[ ] Ranking funcionando

[ ] Dashboard utilizando dados reais
```

---

# 👥 Responsabilidades

## Frontend

Responsável principal:

```text
João Pedro
```

Auxilia na configuração do deploy da interface.

---

## Backend

Responsável principal:

```text
Emanuel
```

Auxilia na publicação e configuração da API Python.

---

## Banco de Dados

Responsável principal:

```text
João Miguel — Gelado
```

Responsável por:

- Supabase;
- PostgreSQL;
- estrutura SQL;
- integração do banco;
- variáveis relacionadas ao banco;
- validação dos dados em produção.

---

## Dashboard

Responsável principal:

```text
Ibson
```

Deverá validar se os dados reais estão sendo apresentados corretamente após o deploy.

---

## QA

Responsável principal:

```text
Matheus Leal
```

Deverá auxiliar na validação da versão publicada.

---

# 🤝 Deploy compartilhado

Apesar da divisão de responsabilidades, o deploy será uma etapa compartilhada pela equipe.

Isso acontece porque a publicação depende da integração entre:

```text
Frontend
+
Backend
+
Banco de Dados
+
Dashboard
```

Todos os integrantes deverão conhecer pelo menos o fluxo geral da aplicação publicada.

---

# 📊 Arquitetura final esperada

```text
                    INTERNET
                       │
                       ▼
              ┌─────────────────┐
              │    FRONTEND     │
              │ React / TS      │
              │ Tailwind        │
              └────────┬────────┘
                       │
                       │ HTTPS
                       ▼
              ┌─────────────────┐
              │     BACKEND     │
              │ Python API      │
              └────────┬────────┘
                       │
                       │ conexão segura
                       ▼
              ┌─────────────────┐
              │    SUPABASE     │
              │   PostgreSQL    │
              └─────────────────┘
```

---

# 📌 Estado atual

Neste momento:

```text
Frontend hosting → ainda será definido

Backend hosting → ainda será definido

Framework Python → será definido pelo Emanuel

Banco → Supabase/PostgreSQL

Repositório → GitHub
```

Este documento deverá ser atualizado quando as plataformas definitivas forem escolhidas.

---

🚀 **Pense Bem Web — desenvolvido localmente, versionado no GitHub e preparado para funcionar como uma aplicação web completa em produção.**