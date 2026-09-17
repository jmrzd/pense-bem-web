from pydantic import BaseModel


class AnswerCreate(BaseModel):
    question_id: int
    option_id: int


class AnswerResult(BaseModel):
    attempt_number: int
    correct: bool
    points_awarded: int
    current_score: int
    question_finished: bool
    match_finished: bool
