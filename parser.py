import json
import sqlite3
from pathlib import Path
from collections import defaultdict

DATA_DIR = Path("data/json")
DB_NAME = "batting.db"


def insert_batter(cur, row):
    cur.execute("""
        INSERT INTO batting_innings (
            match_id,
            season,
            date,
            venue,
            city,
            innings,
            batting_team,
            bowling_team,
            batter,
            runs,
            balls,
            fours,
            sixes,
            strike_rate,
            not_out,
            pathway
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, row)


def parse_match(file_path, cur):
    with open(file_path, "r", encoding="utf-8") as f:
        match = json.load(f)

    info = match["info"]

    match_id = file_path.stem
    season = info.get("season", "")
    date = info["dates"][0]
    venue = info.get("venue", "")
    city = info.get("city", "")

    teams = info["teams"]

    for innings_number, innings in enumerate(match["innings"], start=1):

        batting_team = innings["team"]

        bowling_team = (
            teams[0]
            if teams[1] == batting_team
            else teams[1]
        )

        batters = defaultdict(lambda: {
            "runs": 0,
            "balls": 0,
            "fours": 0,
            "sixes": 0,
            "out": False
        })

        for over in innings["overs"]:

            for delivery in over["deliveries"]:

                batter = delivery["batter"]
                batter_runs = delivery["runs"]["batter"]

                stats = batters[batter]

                stats["runs"] += batter_runs

                # Wide DOES NOT count as a ball faced
                extras = delivery.get("extras", {})

                if "wides" not in extras:
                    stats["balls"] += 1

                if batter_runs == 4:
                    stats["fours"] += 1

                elif batter_runs == 6:
                    stats["sixes"] += 1

                if "wickets" in delivery:

                    for wicket in delivery["wickets"]:

                        if wicket["player_out"] == batter:
                            stats["out"] = True

        for batter, stats in batters.items():

            balls = stats["balls"]

            strike_rate = (
                round(stats["runs"] * 100 / balls, 2)
                if balls > 0 else 0
            )

            pathway = f"{stats['fours']}F-{stats['sixes']}S"

            row = (
                match_id,
                season,
                date,
                venue,
                city,
                innings_number,
                batting_team,
                bowling_team,
                batter,
                stats["runs"],
                balls,
                stats["fours"],
                stats["sixes"],
                strike_rate,
                0 if stats["out"] else 1,
                pathway
            )

            insert_batter(cur, row)


def main():

    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    files = sorted(DATA_DIR.glob("*.json"))

    print(f"Found {len(files)} matches")

    for i, file in enumerate(files, start=1):

        parse_match(file, cur)

        if i % 50 == 0:
            print(f"Parsed {i}/{len(files)} matches")

    conn.commit()
    conn.close()

    print("Done!")


if __name__ == "__main__":
    main()