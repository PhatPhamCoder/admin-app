import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from "../features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Thêm màu thành công!");
    }

    if (isSuccess && updatedColor) {
      toast.success("Cập nhật màu thành công!");
      navigate("/admin/list-color");
    }

    if (isError) {
      toast.error("Thêm màu thất bại!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId !== undefined ? "Cập nhật" : "Thêm"} màu sắc
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Chọn màu sắc"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Cập nhật" : "Thêm"} màu sắc
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
