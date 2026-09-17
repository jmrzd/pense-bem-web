from datetime import datetime

from pydantic import BaseModel


class MatchCreate(BaseModel):
    player_id: int
    program_id: int


class MatchOut(BaseModel):
    id: int
    player_id: int
    program_id: int
    status: str
    score: int
    started_at: datetime
    finished_at: datetime | None
