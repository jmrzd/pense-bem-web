from datetime import datetime

from pydantic import BaseModel


class RankingEntry(BaseModel):
    player_id: int
    nickname: str
    best_score: int
    match_count: int
    last_played_at: datetime
