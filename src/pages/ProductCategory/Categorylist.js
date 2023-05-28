import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../../features/pcategory/pcategorySlice";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CustomModal from "../../components/CustomModal";
import { BsPlusCircle } from "react-icons/bs";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên Danh mục",
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

const Categorylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [ProductCategoryId, setProductCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductCategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const pCategoryState = useSelector((state) => state.pCategory.pCategories);

  const data = [];
  for (let i = 0; i < pCategoryState.length; i++) {
    const date = format(new Date(pCategoryState[i].createdAt), "dd-MM-yyy");
    const name = pCategoryState[i].title;
    const id = pCategoryState[i]._id;
    data.push({
      key: i + 1,
      name: name,
      date: date,
      action: (
        <>
          <Link to={`/admin/category/${id}`} className="fs-5">
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

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <h3 className="title">Danh mục sản phẩm</h3>
        <BsPlusCircle
          size={30}
          onClick={() => navigate("/admin/category")}
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
          deleteCategory(ProductCategoryId);
        }}
        title="Bạn có chắc mà muốn xóa danh mục này!"
      />
    </div>
  );
};

export default Categorylist;
