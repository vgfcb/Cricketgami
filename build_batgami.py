import sqlite3

DB_NAME = "batting.db"


def main():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    # Drop and recreate table
    cur.execute("DROP TABLE IF EXISTS batgamis")

    cur.execute("""
    CREATE TABLE batgamis (
        runs INTEGER,
        balls INTEGER,

        occurrences INTEGER,

        first_match_id TEXT,
        first_batter TEXT,
        first_date TEXT,

        latest_date TEXT,

        unique_pathways INTEGER,

        PRIMARY KEY (runs, balls)
    )
    """)

    # Get every unique Runs × Balls combination
    cur.execute("""
        SELECT DISTINCT runs, balls
        FROM batting_innings
        ORDER BY runs, balls
    """)

    lines = cur.fetchall()

    print(f"Found {len(lines)} unique BatGamis.")

    for line in lines:

        runs = line["runs"]
        balls = line["balls"]

        # Total occurrences
        cur.execute("""
            SELECT COUNT(*)
            FROM batting_innings
            WHERE runs=? AND balls=?
        """, (runs, balls))

        occurrences = cur.fetchone()[0]

        # First occurrence
        cur.execute("""
            SELECT
                match_id,
                batter,
                date
            FROM batting_innings
            WHERE runs=? AND balls=?
            ORDER BY
                date ASC,
                match_id ASC,
                innings ASC
            LIMIT 1
        """, (runs, balls))

        first = cur.fetchone()

        # Latest occurrence
        cur.execute("""
            SELECT MAX(date)
            FROM batting_innings
            WHERE runs=? AND balls=?
        """, (runs, balls))

        latest_date = cur.fetchone()[0]

        # Number of unique pathways
        cur.execute("""
            SELECT COUNT(DISTINCT pathway)
            FROM batting_innings
            WHERE runs=? AND balls=?
        """, (runs, balls))

        unique_pathways = cur.fetchone()[0]

        # Insert summary row
        cur.execute("""
            INSERT INTO batgamis
            (
                runs,
                balls,
                occurrences,
                first_match_id,
                first_batter,
                first_date,
                latest_date,
                unique_pathways
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            runs,
            balls,
            occurrences,
            first["match_id"],
            first["batter"],
            first["date"],
            latest_date,
            unique_pathways
        ))

    conn.commit()

    # Verify
    cur.execute("SELECT COUNT(*) FROM batgamis")
    total = cur.fetchone()[0]

    print(f"\nSuccessfully created {total} BatGamis!")

    conn.close()


if __name__ == "__main__":
    main()