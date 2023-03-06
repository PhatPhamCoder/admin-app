import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import colorReduxer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import orderReducer from "../features/auth/authSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    blog: blogReducer,
    bCategory: bCategoryReducer,
    color: colorReduxer,
    enquiry: enquiryReducer,
    order: orderReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
