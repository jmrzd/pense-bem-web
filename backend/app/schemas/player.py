from datetime import datetime

from pydantic import BaseModel, Field


class PlayerCreate(BaseModel):
    nickname: str = Field(min_length=1, max_length=40)


class PlayerOut(BaseModel):
    id: int
    nickname: str
    created_at: datetime
