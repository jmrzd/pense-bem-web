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
    # so vem preenchido quando question_finished=True (acertou ou esgotou
    # as 3 tentativas) — antes disso a alternativa certa nao pode vazar.
    correct_option_id: int | None = None
