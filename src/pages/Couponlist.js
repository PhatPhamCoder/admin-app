import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  deleteACoupon,
  getCoupons,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên mã ưu đãi",
    dataIndex: "name",
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expire",
  },
  {
    title: "Mức giảm(%)",
    dataIndex: "discount",
  },
  {
    title: "Chức năng",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);
  const data = [];
  for (let i = 0; i < couponState.length; i++) {
    const date = format(new Date(couponState[i].createdAt), "dd-MM-yyy");
    const expire = format(new Date(couponState[i].expiry), "dd-MM-yyy");
    const name = couponState[i].name;
    const id = couponState[i]._id;
    data.push({
      key: i + 1,
      name: name,
      expire: expire,
      date: date,
      discount: couponState[i].discount,
      action: (
        <>
          <Link to={`/admin/coupon/${id}`} className="fs-5">
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

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Danh sách mã ưu đãi</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Bạn có chắc mà muốn xóa ưu đãi này!"
      />
    </div>
  );
};

export default Couponlist;
