from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from queries import (
    get_batgami,
    get_homepage_stats,
    get_leaderboard,
    get_occurrences,
    get_pathways,
    get_player_summary,
    get_runs,
    random_batgami,
    search_players,
    get_player,
    get_created_batgamis,
    heatmap,
    get_similar
)

app = FastAPI(title="BatGami API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to BatGami API",
        "version": "0.1"
    }


@app.get("/batgami/{runs}/{balls}")
def batgami(runs: int, balls: int):

    summary = get_batgami(runs, balls)

    if summary is None:
        return {
            "exists": False
        }

    return {
        "exists": True,
        "summary": summary,
        "pathways": get_pathways(runs, balls),
        "occurrences": get_occurrences(runs, balls),
        "similar": get_similar(runs, balls)
    }


@app.get("/random")
def random():

    return random_batgami()


@app.get("/search_players")
def search_players_api(q: str):
    return search_players(q)


@app.get("/player/{name}")
def player(name: str):

    innings = get_player(name)
    created = get_created_batgamis(name)
    summary = get_player_summary(name)

    return {
        "player": name,
        "summary": summary,
        "innings": innings,
        "created": created
    }
from typing import Optional

@app.get("/leaderboard")
def leaderboard(
    start: Optional[int] = None,
    end: Optional[int] = None
):

    return get_leaderboard(start, end)

@app.get("/heatmap")
def get_heat():

    return heatmap()
@app.get("/homepage-stats")
def homepage_stats():
    return get_homepage_stats()
@app.get("/runs/{runs}")
def runs_page(runs: int):

    rows = get_runs(runs)

    return {
        "runs": runs,
        "count": len(rows),
        "batgamis": rows
    }