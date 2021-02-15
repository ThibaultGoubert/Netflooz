import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import sqlite3
import os

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

DB = os.environ["DB"]

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
	
@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.route('/api/v1/resources/books/search', methods=['GET'])
def api_filter():
    query_parameters = request.args

    value = query_parameters.get('value')
    if not (value):
        return page_not_found(404)

    conn = sqlite3.connect(DB)
    conn.row_factory = dict_factory
    cur = conn.cursor()

    query = 'SELECT * FROM books WHERE author LIKE \'%'+value+'%\' OR first_sentence LIKE \'%'+value+'%\' OR published LIKE \'%'+value+'%\' OR title LIKE \'%'+value+'%\''
    results = cur.execute(query).fetchall()

    return jsonify(results)
	
app.run(host="0.0.0.0", port="5003")