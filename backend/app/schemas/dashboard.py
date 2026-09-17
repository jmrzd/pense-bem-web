from pydantic import BaseModel


class HardestQuestion(BaseModel):
    prompt: str
    program_title: str
    miss_rate: float


class ScoreEvolutionPoint(BaseModel):
    match_label: str
    score: int
    nickname: str


class ScoreDistributionBucket(BaseModel):
    label: str
    total: int


class DashboardStats(BaseModel):
    total_players: int
    total_matches: int
    average_score: float
    accuracy_rate: float
    best_score: int
    best_score_nickname: str
    most_active_player: str
    most_active_player_matches: int
    first_attempt_hits: int
    second_attempt_hits: int
    third_attempt_hits: int
    missed_count: int
    hardest_questions: list[HardestQuestion]
    score_evolution: list[ScoreEvolutionPoint]
    score_distribution: list[ScoreDistributionBucket]
