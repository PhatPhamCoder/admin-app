import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createCategory,
  getProductCategory,
  resetState,
  updateAProductCategory,
} from "../../features/pcategory/pcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;
  console.log(categoryName);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Thêm danh mục thành công!");
    }

    if (isSuccess && updatedCategory) {
      toast.success("Cập nhật danh mục thành công!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Thất bại!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getProductCategoryId !== undefined) {
      dispatch(getProductCategory(getProductCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getProductCategoryId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },

    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getProductCategoryId !== undefined) {
        const data = { id: getProductCategoryId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 100);
      }
    },
  });

  return (
    <>
      <div>
        <div
          className="d-flex align-items-center gap-1"
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin/list-category")}
        >
          <BsArrowLeft size={20} />
          Quay lại danh danh sách
        </div>
        <h3 className="my-2 title">
          {getProductCategoryId !== undefined ? "Cập nhật" : "Thêm"} thương hiệu
        </h3>
      </div>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên danh mục sản phẩm"
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
            {getProductCategoryId !== undefined ? "Cập nhật" : "Thêm"} danh mục
          </button>
        </form>
      </div>
    </>
  );
};

export default Addcat;
