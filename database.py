import sqlite3

DB_NAME = "batting.db"


def create_database():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

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
);
    """)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_database()