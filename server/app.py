import flask as f
from flask import Flask
from helpers import doVis

app = Flask(__name__)

@app.route("/execute/visualization")
def vis_controller():
    query = f.request.args.get("query")
    if not query:
        f.abort(400, description="No query specified.")

    result = doVis(query)
    return {
        "message": f"Successfully executed query: {query}",
        "response": result,
    }
