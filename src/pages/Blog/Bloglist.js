import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlog,
  getBlogs,
  resetState,
} from "../../features/blogs/blogSlice";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CustomModal from "../../components/CustomModal";
import { BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tiêu đề Blog",
    dataIndex: "name",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
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

const Bloglist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state?.blog?.blogs);

  const data = [];
  for (let i = 0; i < blogState.length; i++) {
    const date = format(new Date(blogState[i].createdAt), "dd-MM-yyy");
    const name = blogState[i].title.substr(0, 80) + "...";
    const desc = blogState[i].description;
    const category = blogState[i].category;
    const id = blogState[i]._id;
    data.push({
      key: i + 1,
      name: name,
      description: desc,
      category: category,
      date: date,
      action: (
        <>
          <Link to={`/admin/blog/${id}`} className="fs-5">
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

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    toast.success("Xóa thành công");
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 200);
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <h3 className="title">Danh sách bài viết</h3>
        <BsPlusCircle
          size={30}
          onClick={() => navigate("/admin/blog")}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
          }}
        />
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Bạn có chắc mà muốn xóa blog này!"
      />
    </div>
  );
};

export default Bloglist;
