import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
// Upload Image
import Dropzone from "react-dropzone";
// import { InboxOutlined } from '@ant-design/icons';
import {
  deleteImage,
  deleteImg,
  uploadImg,
} from "../../features/upload/uploadSlice";
import {
  createBlog,
  getBlog,
  updateBlog,
} from "../../features/blogs/blogSlice";
// Upload import end
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  getCategories,
  resetState,
} from "../../features/bcategory/bcategorySlice";
import Editor from "../../utils/Editor";
import { BsArrowLeft } from "react-icons/bs";

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
  description: string().required("Mô tả không được để trống"),
  category: string().required("Danh mục không được để trống"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const imgState = useSelector((state) => state?.upload?.images);
  const bCategoryState = useSelector((state) => state?.bCategory?.bCategories);

  const newBlog = useSelector((state) => state?.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    updatedBlog,
  } = newBlog;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Thêm bài viết thành công!");
    }

    if (isSuccess && updatedBlog) {
      toast.success("Cập nhật bài viết thành công!");
      navigate("/admin/blog-list");
    }

    if (isError) {
      toast.error("Thêm bài viết thất bại!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: [],
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
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
          onClick={() => navigate("/admin/blog-list")}
        >
          <BsArrowLeft size={20} />
          Quay lại danh danh sách
        </div>
        <h3 className="my-2 title">
          {getBlogId !== undefined ? "Cập nhật" : "Thêm"} bài viết
        </h3>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <CustomInput
                      type="text"
                      label="Nhập tiêu đề bài viết"
                      name="title"
                      onChng={formik.handleChange("title")}
                      onBlr={formik.handleBlur("title")}
                      val={formik.values.title}
                    />
                    <div className="error">
                      {formik.touched.title && formik.errors.title}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <select
                      name="category"
                      onChange={formik.handleChange("category")}
                      onBlur={formik.handleBlur("category")}
                      value={formik.values.category}
                      className="form-control py-3 mt-2"
                    >
                      <option value="">Chọn danh mục bài viết</option>
                      {bCategoryState &&
                        bCategoryState?.map((item, index) => {
                          return (
                            <option value={item.title} key={index}>
                              {item.title}
                            </option>
                          );
                        })}
                    </select>
                    <div className="error">
                      {formik.touched.category && formik.errors.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 my-3">
            <Editor
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
              editorLoaded={editorLoaded}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="col-12 row">
            <div className="col-6 text-center" style={{ cursor: "pointer" }}>
              <div className="bg-white p-4 rounded mt-2">
                <Dropzone
                  onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Nhấn vào đây để tải file lên!</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <button
                className="btn btn-success border-0 rounded-3 my-2 d-flex mx-auto"
                type="submit"
              >
                {getBlogId !== undefined ? "Cập nhật" : "Thêm"} bài viết
              </button>
            </div>
            <div className="col-6 showimages my-3 d-flex">
              {imgState.map((item, index) => {
                return (
                  <div key={index} className="position-relative">
                    <button
                      type="button"
                      onClick={() => dispatch(deleteImage(item.public_id))}
                      className="btn-close position-absolute text-white"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img
                      src={item.url}
                      alt=""
                      className="rounded"
                      width={350}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
