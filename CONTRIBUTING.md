# 🤝 Guia de Contribuição — Pense Bem Web

Este documento define o fluxo de desenvolvimento utilizado pela equipe do
Pense Bem Web.

## 🌿 Branch principal

A branch `main` representa a versão estável do projeto.

Após a configuração inicial do repositório, novas funcionalidades não devem
ser desenvolvidas diretamente na `main`.

## 👥 Áreas de desenvolvimento

- `feature/database` — João Miguel "Gelado"
- `feature/dashboard` — Ibson
- `feature/frontend` — João Pedro (JP)
- `feature/backend` — Emanuel
- `feature/qa-docs` — Matheus Leal

Novas branches poderão ser criadas conforme o projeto evoluir.

## 🔄 Fluxo de trabalho

1. Atualizar o repositório local.
2. Trabalhar na branch correspondente à tarefa.
3. Realizar commits pequenos e descritivos.
4. Enviar a branch para o GitHub.
5. Abrir um Pull Request.
6. Revisar as alterações.
7. Realizar o merge na `main`.

## 📝 Padrão de commits

Exemplos:

`feat: adiciona sistema de pontuação`

`fix: corrige cálculo da terceira tentativa`

`docs: atualiza documentação do banco`

`style: ajusta interface do quiz`

`test: adiciona testes da pontuação`

`refactor: reorganiza lógica das perguntas`

## 🔐 Segurança

Nunca enviar ao GitHub:

- senhas;
- tokens;
- chaves privadas;
- `.env`;
- `SUPABASE_SERVICE_ROLE_KEY`;
- outras credenciais.

Utilize `.env.example` apenas para documentar quais variáveis são necessárias.

## ✅ Pull Requests

Antes do merge:

- verificar se o código funciona;
- verificar se não existem credenciais;
- revisar alterações;
- resolver conflitos;
- atualizar documentação quando necessário.

---

🎮 **Pense Bem Web — desenvolvimento colaborativo utilizando Git e GitHub.**