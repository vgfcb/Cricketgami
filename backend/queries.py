import sqlite3
from typing import List, Dict, Optional

DB_NAME = "batting.db"


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


# =====================================================
# BATGAMI FUNCTIONS
# =====================================================

def get_batgami(runs: int, balls: int) -> Optional[Dict]:
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT *
        FROM batgamis
        WHERE runs=? AND balls=?
    """, (runs, balls))

    row = cur.fetchone()

    conn.close()

    return dict(row) if row else None


def get_occurrences(runs: int, balls: int) -> List[Dict]:

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            batter,
            batting_team,
            bowling_team,
            date,
            venue,
            fours,
            sixes,
            strike_rate,
            not_out,
            pathway
        FROM batting_innings
        WHERE runs=? AND balls=?
        ORDER BY date
    """, (runs, balls))

    rows = [dict(r) for r in cur.fetchall()]

    conn.close()

    return rows


def get_pathways(runs: int, balls: int):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            pathway,
            COUNT(*) as occurrences
        FROM batting_innings
        WHERE runs=? AND balls=?
        GROUP BY pathway
        ORDER BY occurrences DESC
    """, (runs, balls))

    rows = [dict(r) for r in cur.fetchall()]

    conn.close()

    return rows


def random_batgami():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT *
        FROM batgamis
        ORDER BY RANDOM()
        LIMIT 1
    """)

    row = dict(cur.fetchone())

    conn.close()

    return row


# =====================================================
# PLAYER FUNCTIONS
# =====================================================

def get_player(name: str):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT *
        FROM batting_innings
        WHERE batter LIKE ?
        ORDER BY date DESC
    """, (f"%{name}%",))

    innings = [dict(r) for r in cur.fetchall()]

    # ------------------------------------
    # Find every BatGami created
    # ------------------------------------

    cur.execute("""
        SELECT runs, balls
        FROM batgamis
        WHERE first_batter LIKE ?
    """, (f"%{name}%",))

    created = {
        (r["runs"], r["balls"])
        for r in cur.fetchall()
    }

    # ------------------------------------
    # Mark each innings
    # ------------------------------------

    for inning in innings:
        inning["is_batgami"] = (
            inning["runs"],
            inning["balls"]
        ) in created

    conn.close()

    return innings
def get_player_summary(name: str):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            COUNT(*) AS innings,
            MAX(runs) AS highest_score,
            ROUND(
                SUM(runs) * 100.0 / SUM(balls),
                1
            ) AS strike_rate,
            SUM(fours) AS fours,
            SUM(sixes) AS sixes
        FROM batting_innings
        WHERE batter LIKE ?
    """, (f"%{name}%",))

    summary = dict(cur.fetchone())

    cur.execute("""
        SELECT COUNT(*) AS created
        FROM batgamis
        WHERE first_batter LIKE ?
    """, (f"%{name}%",))

    summary["batgamis_created"] = cur.fetchone()["created"]

    conn.close()

    return summary


def get_created_batgamis(player: str):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            runs,
            balls,
            occurrences,
            first_date,
            unique_pathways
        FROM batgamis
        WHERE first_batter=?
        ORDER BY first_date
    """, (player,))

    rows = [dict(r) for r in cur.fetchall()]

    conn.close()

    return rows


def search_players(query: str):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT DISTINCT batter
        FROM batting_innings
        WHERE batter LIKE ?
        ORDER BY batter
        LIMIT 20
    """, (f"%{query}%",))

    players = [r["batter"] for r in cur.fetchall()]

    conn.close()

    return players


# =====================================================
# LEADERBOARDS
# =====================================================

def get_leaderboard(start=None, end=None):

    conn = get_connection()
    cur = conn.cursor()

    query = """
        SELECT
            first_batter,
            COUNT(*) AS created
        FROM batgamis
    """

    params = []

    if start and end:
        query += """
        WHERE CAST(substr(first_date,1,4) AS INTEGER)
        BETWEEN ? AND ?
        """
        params.extend([start, end])

    query += """
        GROUP BY first_batter
        ORDER BY created DESC
    """

    cur.execute(query, params)

    rows = [dict(r) for r in cur.fetchall()]

    conn.close()

    return rows


# =====================================================
# HEATMAP
# =====================================================

def heatmap():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            runs,
            balls,
            occurrences
        FROM batgamis
    """)

    rows = [dict(r) for r in cur.fetchall()]

    conn.close()

    return rows


# =====================================================
# SIMILAR BATGAMIS
# =====================================================

def get_similar(runs, balls, radius=5):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            runs,
            balls,
            occurrences
        FROM batgamis
        WHERE
            ABS(runs-?)<=?
            AND
            ABS(balls-?)<=?
        ORDER BY
            ((runs-?)*(runs-?)+(balls-?)*(balls-?))
        LIMIT 20
    """, (
        runs,
        radius,
        balls,
        radius,
        runs,
        runs,
        balls,
        balls
    ))

    rows = [dict(r) for r in cur.fetchall()]

    conn.close()

    return rows
def get_homepage_stats():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            CAST(substr(date, 1, 4) AS INTEGER) AS season,
            COUNT(*) AS innings
        FROM batting_innings
        GROUP BY season
        ORDER BY season
    """)

    innings = {
        row["season"]: row["innings"]
        for row in cur.fetchall()
    }

    cur.execute("""
        SELECT
            CAST(substr(first_date, 1, 4) AS INTEGER) AS season,
            COUNT(*) AS batgamis
        FROM batgamis
        GROUP BY season
        ORDER BY season
    """)

    batgamis = {
        row["season"]: row["batgamis"]
        for row in cur.fetchall()
    }

    seasons = []

    total_innings = 0
    total_batgamis = 0

    for year in sorted(innings.keys()):

        inn = innings.get(year, 0)
        bg = batgamis.get(year, 0)

        total_innings += inn
        total_batgamis += bg

        seasons.append({
            "year": year,
            "innings": inn,
            "batgamis": bg,
            "rate": round(bg * 100 / inn, 1) if inn else 0
        })

    conn.close()

    return {
        "all_time": {
            "innings": total_innings,
            "batgamis": total_batgamis,
            "rate": round(total_batgamis * 100 / total_innings, 1)
        },
        "seasons": seasons
    }


# =====================================================
# TESTING
# =====================================================

if __name__ == "__main__":

    print(get_batgami(46,35))

    print()

    print(get_occurrences(46,35)[:3])

    print()

    print(get_pathways(46,35))

    print()

    print(random_batgami())

    print()

    print(search_players("SS Iyer"))

    print()

    print(get_created_batgamis("SS Iyer"))

    print()
    print(get_player_summary("SS Iyer"))
    print()

    print(get_leaderboard())

    print()

    print(get_similar(46,35))
