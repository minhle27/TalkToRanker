import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Nl4dvResType } from "../types";
import { AmbiguityResponseType } from "../types";

const getVis = async (query: string) => {
  const form = new FormData();
  form.append("query", query);
  form.append("dialog", "auto")
  const { data } = await axios.post(`${apiBaseUrl}/api/execute/visualization`, form);
  return data
};

const updateQuery = async (ambRes : AmbiguityResponseType) : Promise<Nl4dvResType>  => {
  const { data } = await axios.post(`${apiBaseUrl}/api/update_query`, ambRes);
  return data
}; 

export default {
  getVis,
  updateQuery
};
