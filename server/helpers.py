from model_setup import get_nl4dv_instance

def doVis(query: str) -> dict:
    print("EXECUTING QUERY:", query, "on nl4dv")
    nl4dv_instance = get_nl4dv_instance()
    result = nl4dv_instance.analyze_query(query)
    return result