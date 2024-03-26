import json
import flask as f
from flask import Flask
from server.helpers import doVis
from html import escape
from flask_cors import CORS
import os
import requests
api = f.Blueprint("api", __name__)


def make_api_call(user_input):
    print('calling hello')
    url = "http://192.168.1.49:4455/get_response"
    payload = {"userInput": user_input, "userName": 'user'}
    headers = {"Content-Type": "application/json"}
    try:
        output = requests.post(url, data=json.dumps(payload), headers=headers)
        output.raise_for_status()  # Raise an exception for HTTP errors (4xx and 5xx)
        # Assuming the response is in JSON format
        print('type of output', type(output))
        print('text of output', output.text)
        print('response test: ', dir(output))
        #print('PIZZA test: ', output.json())

        return output.text
    
    except requests.exceptions.RequestException as e:
        print(f"Error making API call: {e}")
        return None
    

@api.route("/execute/visualization")
def vis_controller():
    query = f.request.args.get("query")
    if not query:
        f.abort(400, description="No query specified.")
    resp = make_api_call(query)
    print("response from api:", resp)
    result = doVis(query)
    return {
        "message": resp,
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