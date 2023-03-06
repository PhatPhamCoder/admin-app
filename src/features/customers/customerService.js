import Axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await Axios.get(`${base_url}user/all-users`, config);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
