from matplotlib.figure import Figure
import pandas as pd
import os
import base64
from server.model_setup import get_nl4dv_instance
from server.chat2vis_helpers import get_primer, format_question, run_request
from server.config import OPEN_AI_KEY
from io import BytesIO

DATA_PATH = os.path.join(os.getcwd(), "server", "data")
data_path = os.path.join(DATA_PATH, "movies-w-year.csv")
URL = "http://localhost:5000"

nl4dv_instance = get_nl4dv_instance()
datasets = {}
datasets["Movies"] = pd.read_csv(data_path)

def doVis(request) -> dict:
    query = request.form['query']
    print("EXECUTING QUERY:", query, "on nl4dv")
    dialog = True if 'dialog' in request.form and request.form['dialog'] == 'true' else False
    if 'dialog' in request.form and request.form['dialog'] == "auto":
        dialog = "auto"
        
    if dialog is True:
        dialog_id = request.form['dialog_id']
        query_id = int(request.form['query_id'])
        result = nl4dv_instance.analyze_query(query, dialog=dialog, dialog_id=dialog_id, query_id=query_id, debug=True)
    elif dialog == "auto":
        result = nl4dv_instance.analyze_query(query, dialog=dialog, debug=True)
    else:
        result = nl4dv_instance.analyze_query(query, debug=True)
        
    for vis in result["visList"]:
        new_url = f"{URL}/api/datasets/movies-w-year.csv"
        vis["vlSpec"]["data"]["url"] = new_url
    result["query"] = query
    print(result)
    return result

def chat2vis(query: str) -> dict: 
    print("EXECUTING QUERY:", query, "using GPT")
    primer1, primer2 = get_primer(pd.read_csv(data_path),'datasets["'+ "Movies" + '"]') 
    model_type = "ChatGPT-4"
    question_to_ask = format_question(primer1, primer2, query, model_type)   
    answer = ""
    answer = run_request(question_to_ask, "gpt-4", key=OPEN_AI_KEY)
    answer = primer2 + answer
    print("Model: " + model_type)
    print(answer)
    ldict = {}
    answer += "\n"
    answer += "buf = BytesIO()\n"
    answer += "fig.savefig(buf, format=\"png\")\n"
    answer += "data = base64.b64encode(buf.getbuffer()).decode(\"ascii\")\n"
    answer += "res = f\"<img src='data:image/png;base64,{data}'/>\""
    exec(answer, globals(), ldict)
    return ldict['res']
    
def updateQuery(ambiguity_obj):
    result = nl4dv_instance.update_query(ambiguity_obj)
    for vis in result["visList"]:
        new_url = f"{URL}/api/datasets/movies-w-year.csv"
        vis["vlSpec"]["data"]["url"] = new_url
    return result
    
if __name__ == "__main__":
    query = "create a barchart showing average gross across genres"
    chat2vis(query)