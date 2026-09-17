from fastapi import APIRouter, Depends
from psycopg import Connection

from app.core.database import get_db
from app.schemas.dashboard import DashboardStats
from app.services import dashboard_service

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("", response_model=DashboardStats)
def get_dashboard(conn: Connection = Depends(get_db)):
    """Indicadores e gráficos do dashboard, calculados a partir de partidas reais."""
    return dashboard_service.get_dashboard_stats(conn)
