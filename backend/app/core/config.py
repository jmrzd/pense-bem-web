from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuração da aplicação, lida de variáveis de ambiente e/ou .env."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str  # string de conexão do Postgres/Supabase (obrigatória, sem default)
    app_env: str = "development"
    app_debug: bool = True
    frontend_url: str = "http://localhost:5173"  # usado para liberar CORS só pro nosso front


# Instanciado uma única vez, no import do módulo — os testes precisam
# definir as variáveis de ambiente ANTES do primeiro `import app...`.
settings = Settings()
