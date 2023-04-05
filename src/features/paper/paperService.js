import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getAllPaper = async () => {
  const response = await axios.get(`${base_url}paper/`);

  return response.data;
};

const createPaper = async (paper) => {
  const response = await axios.post(`${base_url}paper/`, paper, config);

  return response.data;
};

const updatePaper = async (paper) => {
  const response = await axios.put(
    `${base_url}paper/${paper.id}`,
    { title: paper.paperData.title },
    config,
  );

  return response.data;
};

const getAPaper = async (id) => {
  const response = await axios.get(`${base_url}paper/${id}`, config);

  return response.data;
};

const deletePaper = async (id) => {
  const response = await axios.delete(`${base_url}paper/${id}`, config);

  return response.data;
};

const paperService = {
  getAllPaper,
  createPaper,
  updatePaper,
  getAPaper,
  deletePaper,
};

export default paperService;
