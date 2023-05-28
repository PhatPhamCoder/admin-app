import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getEnquiries = async () => {
  const response = await axiosClient.get(`${base_url}enquiry/`);

  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axiosClient.delete(`${base_url}enquiry/${id}`, config);

  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axiosClient.get(`${base_url}enquiry/${id}`, config);

  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axiosClient.put(
    `${base_url}enquiry/${enq.id}`,
    { status: enq.enqData },
    config,
  );

  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
};

export default enquiryService;
