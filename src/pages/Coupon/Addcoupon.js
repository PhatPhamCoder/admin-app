import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { date, number, object, string } from "yup";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

let userSchema = object().shape({
  name: string().required("Tiêu đề không được để trống"),
  expiry: date().required("Thời hạn không được để trống"),
  discount: number().required("Ngày không được để trống"),
});

const Addcoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Thêm ưu đãi thành công!");
    }

    if (isSuccess && updatedCoupon) {
      toast.success("Cập nhật ưu đãi thành công!");
      navigate("/admin/coupon-list");
    }

    if (isError) {
      toast.error("Thêm ưu đãi thất bại!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: "",
      discount: couponDiscount || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 200);
      }
    },
  });

  return (
    <div>
      <div>
        <div
          className="d-flex align-items-center gap-1"
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin/coupon-list")}
        >
          <BsArrowLeft size={20} />
          Quay lại danh danh sách
        </div>
        <h3 className="my-2 title">
          {getCouponId !== undefined ? "Cập nhật" : "Thêm"} ưu đãi
        </h3>
      </div>
      <div className="row">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="col-6">
            <CustomInput
              type="text"
              label="Nhập tên ưu đãi"
              name="name"
              onChng={formik.handleChange("name")}
              onBlr={formik.handleBlur("name")}
              val={formik.values.name}
              id="name"
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
            <CustomInput
              type="number"
              label="Đặt giá trị giảm"
              name="discount"
              onChng={formik.handleChange("discount")}
              onBlr={formik.handleBlur("discount")}
              val={formik.values.discount}
              id="discount"
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>
            <CustomInput
              type="date"
              label="Chọn ngày hết hạn"
              name="expiry"
              onChng={formik.handleChange("expiry")}
              onBlr={formik.handleBlur("expiry")}
              val={formik.values.expiry}
              id="expiry"
            />

            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 d-flex mx-auto"
            type="submit"
          >
            {getCouponId !== undefined ? "Cập nhật" : "Thêm"} ưu đãi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
