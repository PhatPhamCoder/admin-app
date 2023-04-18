import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getaorder/${id}`, config);
  return response.data;
};

const updateOrder = async (data) => {
  console.log(data);
  const response = await axios.put(
    `${base_url}user/updateorder/${data.id}`,
    { status: data.status },
    config,
  );
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderCount`,
    config,
  );
  return response.data;
};

const getYearlyStatis = async () => {
  const response = await axios.get(
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
};

export default authService;
