import flask as f
from flask import Flask, request
from html import escape
from flask_cors import CORS
import os

from server.helpers import doVis, chat2vis, updateQuery

api = f.Blueprint("api", __name__)

@api.route('/execute/visualization', methods=['POST'])
def vis_controller():
    print(request.form)
    query = request.form['query']
    if not query:
        f.abort(400, description="No query specified.")
        
    result = doVis(request)
    return {
        "message": f"Successfully executed query: {query}",
        "response": result,
    }
    
@api.route("/execute/chat2vis/visualization")
def chat2vis_controller():
    query = f.request.args.get("query")
    if not query:
        f.abort(400, description="No query specified.")

    result = chat2vis(query)
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
        
@api.route('/update_query', methods=['POST'])
def update_query():
    ambiguity_obj = request.get_json()
    print(ambiguity_obj)
    result = updateQuery(ambiguity_obj)
    print(result)
    return {
        "message": "Successfully update query",
        "response": result,
    }