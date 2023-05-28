import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await axiosClient.get(`${base_url}user/all-users`, config);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
