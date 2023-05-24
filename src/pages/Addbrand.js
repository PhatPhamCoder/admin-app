import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createBrand,
  getBrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Thêm đối tác thành công!");
    }

    if (isSuccess && updatedBrand) {
      toast.success("Cập nhật đối tác thành công!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Thất bại!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
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
          onClick={() => navigate("/admin/list-brand")}
        >
          <BsArrowLeft size={20} />
          Quay lại danh danh sách
        </div>
        <h3 className="my-2 title">
          {getBrandId !== undefined ? "Cập nhật" : "Thêm"} thương hiệu
        </h3>
      </div>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên đối tác"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5 d-flex mx-auto"
            type="submit"
          >
            {getBrandId !== undefined ? "Cập nhật" : "Thêm"} đối tác
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
