import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getAllSocial = async () => {
  return await axiosClient.get(`${base_url}social/get-all`, config);
};

const updateSocial = async (dataUpdate) => {
  const response = await axiosClient.put(
    `${base_url}social/update-social`,
    {
      facebook: dataUpdate?.facebook,
      email: dataUpdate?.email,
      tiktok: dataUpdate?.tiktok,
      instagram: dataUpdate?.instagram,
      phoneNumber: dataUpdate?.phoneNumber,
      address: dataUpdate?.address,
      footer: dataUpdate?.footer,
      map: dataUpdate?.map,
    },
    config,
  );
  return response.data;
};

const socialService = {
  getAllSocial,
  updateSocial,
};

export default socialService;
