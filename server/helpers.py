from server.model_setup import get_nl4dv_instance

URL = "http://localhost:5000"

def doVis(query: str) -> dict:
    print("EXECUTING QUERY:", query, "on nl4dv")
    nl4dv_instance = get_nl4dv_instance()
    result = nl4dv_instance.analyze_query(query)
    for vis in result["visList"]:
        new_url = f"{URL}/api/datasets/movies-w-year.csv"
        vis["vlSpec"]["data"]["url"] = new_url
    result["query"] = query
    return result