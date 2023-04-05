import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createPaper,
  getPaper,
  resetState,
  updatePaper,
} from "../features/paper/paperSlice";

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
});

const Addpaper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPaperId = location.pathname.split("/")[3];
  const newPaper = useSelector((state) => state.paper);
  const { isSuccess, isError, isLoading, createdPaper, updatedPaper } =
    newPaper;
  //   console.log(categoryName);
  useEffect(() => {
    if (isSuccess && createdPaper) {
      toast.success("Thêm loại giấy thành công!");
    }

    if (isSuccess && updatedPaper) {
      toast.success("Cập nhật loại giấy thành công!");
      navigate("/admin/list-paper");
    }
    if (isError) {
      toast.error("Thất bại!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getPaperId !== undefined) {
      dispatch(getPaper(getPaperId));
    } else {
      dispatch(resetState());
    }
  }, [getPaperId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },

    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getPaperId !== undefined) {
        const data = { id: getPaperId, paperData: values };
        dispatch(updatePaper(data));
        dispatch(resetState());
      } else {
        dispatch(createPaper(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 100);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getPaperId !== undefined ? "Cập nhật" : "Thêm"} loại giấy
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên loại giấy"
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
            {getPaperId !== undefined ? "Cập nhật" : "Thêm"} loại giấy
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpaper;
