import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { TiDocumentAdd } from "react-icons/ti";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import CustomModal from "../../components/CustomModal";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createBlogCategory,
  getBlogCat,
  updateBlogCat,
  deleteABlogCat,
  getCategories,
  resetState,
} from "../../features/bcategory/bcategorySlice";
import CustomInput from "../../components/CustomInput";
const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên danh mục",
    dataIndex: "name",
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
  },
  {
    title: "Chức năng",
    dataIndex: "action",
  },
];

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
});

const Blogcatlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    BlogCatName,
    updetedBlogCategory,
  } = newBlogCategory;
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Thêm danh mục thành công!");
    }

    if (isSuccess && updetedBlogCategory) {
      toast.success("Cập nhật danh mục thành công!");
      navigate("/admin/blog-category-list");
    }

    if (isError) {
      toast.error("Thêm danh mục thất bại!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getBlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogCatName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, blogCatData: values };
        dispatch(updateBlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setOpenAdd(false);
        setTimeout(() => {
          dispatch(resetState());
          dispatch(getCategories());
        }, 200);
      }
    },
  });

  const bCategoryState = useSelector((state) => state?.bCategory?.bCategories);

  const data = [];
  for (let i = 0; i < bCategoryState.length; i++) {
    const date = format(new Date(bCategoryState[i].createdAt), "dd-MM-yyy");
    const name = bCategoryState[i].title;
    const desc = bCategoryState[i].description;
    const category = bCategoryState[i].category;
    const id = bCategoryState[i]._id;
    data.push({
      key: i + 1,
      name: name,
      description: desc,
      category: category,
      date: date,
      action: (
        <>
          <Link to={`/admin/blog-category/${id}`} className="fs-5">
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(id)}
            className="fs-5 ms-3 bg-transparent border-0 text-danger"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlogCat = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    toast.success("Xóa thành công");
    setTimeout(() => {
      dispatch(getCategories());
    }, 200);
  };

  const handleReset = () => {
    formik.resetForm();
    setOpenAdd(false);
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <h3 className="title">Danh mục bài viết</h3>
        <TiDocumentAdd
          size={30}
          onClick={() => setOpenAdd(true)}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
          }}
        />
      </div>
      {openAdd === true && (
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-column justify-content-start my-2">
            <div className="mb-2">
              <div
                style={{
                  width: "500px",
                }}
              >
                <CustomInput
                  type="text"
                  label="Nhập tên danh mục bài viết"
                  name="title"
                  onChng={formik.handleChange("title")}
                  onBlr={formik.handleBlur("title")}
                  val={formik.values.title}
                  i_class={"w-100"}
                />
              </div>
              <div className="error">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
            <div className="d-flex gap-1">
              <button
                className="btn btn-success border-0 rounded-3"
                type="submit"
              >
                {getBlogCatId !== undefined ? "Cập nhật" : "Thêm"} danh mục bài
                viết
              </button>
              <button
                className="btn btn-warning border-0 rounded-3"
                type="button"
                onClick={handleReset}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCat(blogCatId);
        }}
        title="Bạn có chắc mà muốn xóa danh mục này!"
      />
    </div>
  );
};

export default Blogcatlist;
