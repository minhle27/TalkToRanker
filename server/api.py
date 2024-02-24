import flask as f
from flask import Flask
from server.helpers import doVis
from html import escape
from flask_cors import CORS
import os

api = f.Blueprint("api", __name__)

@api.route("/execute/visualization")
def vis_controller():
    query = f.request.args.get("query")
    if not query:
        f.abort(400, description="No query specified.")

    result = doVis(query)
    return {
        "message": f"Successfully executed query: {query}",
        "response": result,
    }

@api.route("/datasets")
@api.route("/datasets/<dataset_name>")
def datasets_controller(dataset_name=None):
    data_path = os.path.join(f.current_app.config["SERVER_PATH"], "data")

    # Send all datasets if no dataset name is specified
    if dataset_name is None or dataset_name == "":
        return {
            "message": "Successfully fetched all stored data (names of files only)",
            "response": os.listdir(data_path),
        }

    filename = escape(dataset_name)
    try:
        return f.send_from_directory(data_path, filename)
    except FileNotFoundError:
        f.abort(404, description=f'Dataset "{filename}" not found.')