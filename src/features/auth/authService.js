import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const login = async (userData) => {
  return await axiosClient.post(`${base_url}user/admin-login`, userData);
};

const statusUser = async (id, data) => {
  const response = await axiosClient.put(
    `${base_url}user/status/${id}`,
    data,
    config,
  );
  return response.data;
};

// order
const getOrders = async () => {
  const response = await axiosClient.get(
    `${base_url}user/getallorders`,
    config,
  );
  return response.data;
};

const getOrder = async (id) => {
  const response = await axiosClient.get(
    `${base_url}user/getaorder/${id}`,
    config,
  );
  return response.data;
};

const updateOrder = async (id, data) => {
  const response = await axiosClient.put(
    `${base_url}user/updateorder/${id}`,
    data,
    config,
  );
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axiosClient.get(
    `${base_url}user/getMonthWiseOrderCount`,
    config,
  );
  return response.data;
};

const getYearlyStatis = async () => {
  const response = await axiosClient.get(
    `${base_url}user/getYearlyTotalOrders`,
    config,
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getMonthlyOrders,
  getYearlyStatis,
  getOrder,
  updateOrder,
  statusUser,
};

export default authService;
