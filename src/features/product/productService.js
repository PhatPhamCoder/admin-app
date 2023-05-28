import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axiosClient.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (data) => {
  const response = await axiosClient.post(`${base_url}product/`, data, config);
  return response.data;
};

const getProduct = async (slug) => {
  const response = await axiosClient.get(`${base_url}product/${slug}`);

  return response.data;
};

const updateProduct = async (productData) => {
  // console.log(product);
  const response = await axiosClient.put(
    `${base_url}product/${productData?.id}`,
    {
      title: productData?.title,
      slug: productData?.slug,
      codeProduct: productData?.codeProduct,
      description: productData?.description,
      price: productData?.price,
      discount: productData?.discount,
      brand: productData?.brand,
      category: productData?.category,
      quantity: productData?.quantity,
      tags: productData?.tags,
      pageNumber: productData?.pageNumber,
      kindOfPaper: productData?.kindOfPaper,
      paperSize: productData?.paperSize,
    },
    config,
  );

  return response.data;
};

const deleteProduct = async (slug) => {
  const response = await axiosClient.delete(
    `${base_url}product/${slug}`,
    config,
  );

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
