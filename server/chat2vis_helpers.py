# @Chat2vis
import openai
from langchain import HuggingFaceHub, LLMChain,PromptTemplate

def run_request(question_to_ask, model_type, key):
    if model_type == "gpt-4" or model_type == "gpt-3.5-turbo" :
        # Run OpenAI ChatCompletion API
        task = "Generate Python Code Script."
        if model_type == "gpt-4":
            # Ensure GPT-4 does not include additional comments
            task = task + " The script should only include code, no comments."
        openai.api_key = key
        response = openai.ChatCompletion.create(model=model_type,
            messages=[{"role":"system","content":task},{"role":"user","content":question_to_ask}])
        llm_response = response["choices"][0]["message"]["content"]
   
    # rejig the response
    llm_response = format_response(llm_response)
    return llm_response

def format_question(primer_desc,primer_code , question, model_type):
    # Fill in the model_specific_instructions variable
    instructions = ""
    if model_type == "Code Llama":
        # Code llama tends to misuse the "c" argument when creating scatter plots
        instructions = "\nDo not use the 'c' argument in the plot function, use 'color' instead and only pass color names like 'green', 'red', 'blue'."
    primer_desc = primer_desc.format(instructions)  
    # Put the question at the end of the description primer within quotes, then add on the code primer.
    return  '"""\n' + primer_desc + question + '\n"""\n' + primer_code

def format_response( res):
    # Remove the load_csv from the answer if it exists
    csv_line = res.find("read_csv")
    if csv_line > 0:
        return_before_csv_line = res[0:csv_line].rfind("\n")
        if return_before_csv_line == -1:
            # The read_csv line is the first line so there is nothing to need before it
            res_before = ""
        else:
            res_before = res[0:return_before_csv_line]
        res_after = res[csv_line:]
        return_after_csv_line = res_after.find("\n")
        if return_after_csv_line == -1:
            # The read_csv is the last line
            res_after = ""
        else:
            res_after = res_after[return_after_csv_line:]
        res = res_before + res_after
    return res

def get_primer(df_dataset,df_name):
    # Primer function to take a dataframe and its name
    # and the name of the columns
    # and any columns with less than 20 unique values it adds the values to the primer
    # and horizontal grid lines and labeling
    primer_desc = "Use a dataframe called df from data_file.csv with columns '" \
        + "','".join(str(x) for x in df_dataset.columns) + "'. "
    for i in df_dataset.columns:
        if len(df_dataset[i].drop_duplicates()) < 20 and df_dataset.dtypes[i]=="O":
            primer_desc = primer_desc + "\nThe column '" + i + "' has categorical values '" + \
                "','".join(str(x) for x in df_dataset[i].drop_duplicates()) + "'. "
        elif df_dataset.dtypes[i]=="int64" or df_dataset.dtypes[i]=="float64":
            primer_desc = primer_desc + "\nThe column '" + i + "' is type " + str(df_dataset.dtypes[i]) + " and contains numeric values. "   
    primer_desc = primer_desc + "\nLabel the x and y axes appropriately."
    primer_desc = primer_desc + "\nUsing figure instead of pyplot."
    primer_desc = primer_desc + "\nNo need to show the plot."
    primer_desc = primer_desc + "\nAdd a title. Set the fig suptitle as empty."
    primer_desc = primer_desc + "{}" # Space for additional instructions if needed
    primer_desc = primer_desc + "\nUsing Python version 3.9.12, create a script using the dataframe df to graph the following: "
    pimer_code = "import pandas as pd\nfrom matplotlib.figure import Figure\n"
    pimer_code = pimer_code + "fig = Figure(figsize=(15, 10))\n"
    pimer_code = pimer_code + "ax = fig.subplots(1, 1)\n"
    pimer_code = pimer_code + "ax.spines['top'].set_visible(False)\nax.spines['right'].set_visible(False) \n"
    pimer_code = pimer_code + "df=" + df_name + ".copy()\n"
    return primer_desc,pimer_code