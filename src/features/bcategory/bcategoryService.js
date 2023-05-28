import axios from "axios";
import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
  const response = await axiosClient.get(`${base_url}blogcategory/`);

  return response.data;
};

const createBlogCategory = async (bcategory) => {
  const response = await axiosClient.post(
    `${base_url}blogcategory/`,
    bcategory,
    config,
  );

  return response.data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await axiosClient.put(
    `${base_url}blogcategory/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config,
  );

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axiosClient.get(
    `${base_url}blogcategory/${id}`,
    config,
  );

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axiosClient.delete(
    `${base_url}blogcategory/${id}`,
    config,
  );

  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
};

export default bCategoryService;
