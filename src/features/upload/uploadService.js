import { config } from "../../utils/axiosConfig";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const uploadImg = async (data) => {
  const response = await axiosClient.post(`upload/`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axiosClient.delete(`upload/delete-img/${id}`, config);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
