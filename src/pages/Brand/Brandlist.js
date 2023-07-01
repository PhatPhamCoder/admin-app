import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, resetState } from "../../features/brand/brandSlice";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CustomModal from "../../components/CustomModal";
import { deleteABrand } from "../../features/brand/brandSlice";
import { BsPlusCircle } from "react-icons/bs";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên đối tác",
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

const Brandlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);

  const data = [];
  for (let i = 0; i < brandState.length; i++) {
    const date = format(new Date(brandState[i].createdAt), "dd-MM-yyy");
    const name = brandState[i].title;
    const id = brandState[i]._id;
    data.push({
      key: i + 1,
      name: name,
      date: date,
      action: (
        <>
          <Link to={`/admin/brand/${id}`} className="fs-5">
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

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 200);
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <h3 className="title">Danh sách thương hiệu</h3>
        <BsPlusCircle
          size={30}
          onClick={() => navigate("/admin/brand")}
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
          deleteBrand(brandId);
        }}
        title="Bạn có chắc mà muốn xóa đối tác này!"
      />
    </div>
  );
};

export default Brandlist;
