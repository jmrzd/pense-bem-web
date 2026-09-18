from pydantic import BaseModel


# Sem is_correct de propósito:
# essa resposta vai pro frontend, e a alternativa certa
# não pode vazar antes do jogador responder.
class OptionOut(BaseModel):
    id: int
    option_code: str
    option_text: str


class QuestionOut(BaseModel):
    id: int
    question_number: int
    prompt: str
    image_url: str | None = None
    options: list[OptionOut]
    