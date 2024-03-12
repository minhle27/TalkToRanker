import pandas as pd
import os
from server.model_setup import get_nl4dv_instance
from server.chat2vis_helpers import get_primer, format_question, run_request


DATA_PATH = os.path.join(os.getcwd(), "data")
data_path = os.path.join(DATA_PATH, "movies-w-year.csv")
URL = "http://localhost:5000"
openai_key = "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"
nl4dv_instance = get_nl4dv_instance()

def doVis(query: str) -> dict:
    print("EXECUTING QUERY:", query, "on nl4dv")
    result = nl4dv_instance.analyze_query(query, dialog='auto')
    for vis in result["visList"]:
        new_url = f"{URL}/api/datasets/movies-w-year.csv"
        vis["vlSpec"]["data"]["url"] = new_url
    result["query"] = query
    print(result)
    return result

def chat2vis(query: str) -> dict: 
    print("EXECUTING QUERY:", query, "using chat2vis")
    primer1, primer2 = get_primer(pd.read_csv(data_path),'datasets["'+ "movies-w-year.csv" + '"]') 
    model_type = "ChatGPT-3.5"
    question_to_ask = format_question(primer1, primer2, query, model_type)   
    answer = ""
    answer = run_request(question_to_ask, "gpt-3.5-turbo", key=openai_key)
    answer = primer2 + answer
    print("Model: " + model_type)
    print(answer)
    
if __name__ == "__main__":
    query = "create a barchart showing average gross across genres"
    chat2vis(query)