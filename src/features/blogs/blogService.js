import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axiosClient.get(`${base_url}blog/`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axiosClient.post(`${base_url}blog/`, blog, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axiosClient.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config,
  );
  return response.data;
};

const getBlog = async (id) => {
  const response = await axiosClient.get(`${base_url}blog/${id}`, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axiosClient.delete(`${base_url}blog/${id}`, config);
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
};

export default blogService;
