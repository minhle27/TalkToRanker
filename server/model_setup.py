from nl4dv import NL4DV
import os

print(__file__)
cwd = os.getcwd()
DATA_PATH = os.path.join(cwd, "data")
MODELS_PATH = os.path.join("server", "models")

def get_nl4dv_instance(data_path=os.path.join(DATA_PATH, "Apartments.csv")):
    nl4dv_instance = NL4DV(data_url=data_path)

    # using Spacy
    # ToDo: ensure that the below spacy model is installed. if using another model, modify accordingly.
    dependency_parser_config = {
        "name": "spacy",
        "model": "en_core_web_sm",
        "parser": None,
    }

    # Set the Dependency Parser
    nl4dv_instance.set_dependency_parser(config=dependency_parser_config)

    return nl4dv_instance

if __name__ == "__main__":
    nl4dv_instance = get_nl4dv_instance()
    query = "create a barchart ranking according to room counts"

    output = nl4dv_instance.analyze_query(query)

    print(output)