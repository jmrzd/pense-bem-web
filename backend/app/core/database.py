from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

from app.core.config import settings

# open=False: o pool só é aberto no lifespan do FastAPI (app/main.py), não
# na hora do import — assim os testes conseguem trocar o DATABASE_URL antes
# de qualquer conexão real ser aberta.
pool = ConnectionPool(
    conninfo=settings.database_url,
    min_size=1,
    max_size=10,
    kwargs={"row_factory": dict_row},  # linhas viram dict em vez de tupla
    open=False,
)


def get_db():
    """Dependency do FastAPI: uma conexão por request, com commit/rollback automático."""
    with pool.connection() as conn:
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
