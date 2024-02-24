import axios from "axios";
import { apiBaseUrl } from "../constants";

const getVis = async (query: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/execute/visualization?query=${query}`);
  return data
};

export default {
  getVis
};
