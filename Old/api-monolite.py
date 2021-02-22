import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import sqlite3

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
cd 
@app.route('/', methods=['GET'])
def home():
    return '''<h1>Coucou</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    conn = sqlite3.connect('books.db')
    print("Conn:" + str(conn))
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_books = cur.execute('SELECT * FROM books;').fetchall()

    return jsonify(all_books)


@app.route('/api/v1/resources/books/search', methods=['GET'])
def api_filter():
    query_parameters = request.args

    id = query_parameters.get('id')
    published = query_parameters.get('published')
    author = query_parameters.get('author')
    title = query_parameters.get('title')

    query = "SELECT * FROM books WHERE"
    to_filter = []

    if id:
        query += ' id=? AND'
        to_filter.append(id)
    if published:
        query += ' published=? AND'
        to_filter.append(published)
    if author:
        query += ' author=? AND'
        to_filter.append(author)
    if title:
        query += ' title=? AND'
        to_filter.append(title)
    if not (id or published or author or title):
        return page_not_found(404)

    query = query[:-4] + ';'

    conn = sqlite3.connect('books.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    results = cur.execute(query, to_filter).fetchall()

    return jsonify(results)

@app.route('/api/v1/resources/notes/all', methods=['GET'])
def api_notes_all():
    conn = sqlite3.connect('notes.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_notes = cur.execute('SELECT id_book, AVG(note) as AVG FROM notes GROUP BY id_book;').fetchall()

    return jsonify(all_notes)

@app.route('/api/v1/resources/notes', methods=['GET'])
def api_notes_filter():
    conn = sqlite3.connect('notes.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    query_parameters = request.args
    id_book = query_parameters.get('id_book')

    note = cur.execute("SELECT id_book, AVG(note) as AVG FROM notes WHERE id_book ="+ id_book +" GROUP BY id_book;").fetchall()
    return jsonify(note)

@app.route('/api/v1/resources/notes/create', methods=['POST'])
def api_notes_create():
    query_parameters = request.args

    id_book = query_parameters.get('id_book')
    note = query_parameters.get('note')

    if not (id_book or note):
        return page_not_found(404)

    try:
        with sqlite3.connect("notes.db") as con:
            cur = con.cursor()
            cur.execute("INSERT INTO notes (id_book,note) VALUES (?,?)",(id_book,note))
            con.commit()
            return '1'
    except:
        con.rollback()
        return '-1'
    finally:
        con.close()

app.run()
