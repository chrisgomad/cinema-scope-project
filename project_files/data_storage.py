import sqlite3

def store_popularity_rank(name, popularity, date):
    conn = sqlite3.connect('movie_database.db')
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY, name TEXT, popularity INTEGER, date TEXT)")
    c.execute("INSERT INTO movies (name, popularity, date) VALUES (?,?,?)", (name, popularity, date))
    conn.commit()
    conn.close()