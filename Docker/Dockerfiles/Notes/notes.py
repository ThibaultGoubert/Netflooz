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
	
@app.route('/', methods=['GET'])
def home():
    return '''<h1>API notes</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404
	
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

app.run(host="0.0.0.0", port=5002)