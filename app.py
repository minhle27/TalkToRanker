from flask import Flask, send_from_directory, request, session
from flask_cors import CORS
from server.api import api
from flask_session import Session
import os


app = Flask(__name__, static_url_path="", static_folder="client/dist")
SESSION_TYPE = 'filesystem'
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SERVER_PATH"] = os.path.join("server")
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = SESSION_TYPE
Session(app)

@app.route("/", defaults={"path": ""})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")

app.register_blueprint(api, url_prefix="/api")
