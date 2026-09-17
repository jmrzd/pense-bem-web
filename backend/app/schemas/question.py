from pydantic import BaseModel


class OptionOut(BaseModel):
    id: int
    option_code: str
    option_text: str


class QuestionOut(BaseModel):
    id: int
    question_number: int
    prompt: str
    options: list[OptionOut]
