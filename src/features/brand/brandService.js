import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getBrands = async () => {
  const response = await axiosClient.get(`${base_url}brand/`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axiosClient.post(`${base_url}brand/`, brand, config);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axiosClient.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config,
  );
  return response.data;
};

const getBrand = async (id) => {
  const response = await axiosClient.get(`${base_url}brand/${id}`, config);
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axiosClient.delete(`${base_url}brand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
