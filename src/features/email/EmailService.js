import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getEmail = async () => {
  const response = await axiosClient.get(`${base_url}email/`, config);

  return response.data;
};

const emailService = {
  getEmail,
};

export default emailService;
