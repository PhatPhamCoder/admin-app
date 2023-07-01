import { base_url } from "../../utils/base_url";
import { axiosClient, config } from "../../utils/axiosConfig";

const getCoupons = async () => {
  const response = await axiosClient.get(`${base_url}coupon/`, config);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axiosClient.post(`${base_url}coupon/`, coupon, config);
  return response.data;
};

const updateCoupon = async (coupon) => {
  // console.log(coupon);
  const response = await axiosClient.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config,
  );
  return response.data;
};

const getCoupon = async (id) => {
  const response = await axiosClient.get(`${base_url}coupon/${id}`, config);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axiosClient.delete(`${base_url}coupon/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};

export default couponService;
