import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (productData) => {
  const response = await axios.post(`${base_url}product/`, productData, config);

  return response.data;
};

const getProduct = async (slug) => {
  const response = await axios.get(`${base_url}product/${slug}`);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.slug}`,
    {
      title: product?.productData?.title,
      description: product?.productData?.description,
      category: product?.productData?.category,
      price: product?.productData?.price,
      quantity: product?.productData?.quantity,
      codeProduct: product?.productData?.codeProduct,
    },
    config,
  );

  return response.data;
};

const deleteProduct = async (slug) => {
  const response = await axios.delete(`${base_url}product/${slug}`, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};

export default productService;
