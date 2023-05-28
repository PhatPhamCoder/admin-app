import axios from "axios";
import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axiosClient.get(`${base_url}category/`);

  return response.data;
};

const createProductCategory = async (category) => {
  const response = await axiosClient.post(
    `${base_url}category/`,
    category,
    config,
  );

  return response.data;
};

const updateProductCategory = async (category) => {
  const response = await axiosClient.put(
    `${base_url}category/${category.id}`,
    { title: category.pCatData.title },
    config,
  );

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axiosClient.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axiosClient.delete(
    `${base_url}category/${id}`,
    config,
  );

  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  getProductCategory,
  deleteProductCategory,
};

export default pCategoryService;
