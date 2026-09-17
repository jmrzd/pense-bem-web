from pydantic import BaseModel


class ProgramOut(BaseModel):
    id: int
    code: str
    title: str
    description: str | None
    active: bool
