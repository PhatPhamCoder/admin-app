import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
import { format } from "date-fns";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
  },
  {
    title: "Chức năng",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data = [];
  for (let i = 0; i < orderState.length; i++) {
    const name = orderState[i].orderby.firstname;
    const products = orderState[i].products;
    const statuspayment = orderState[i].paymentIntent.status;
    const id = orderState[i].orderby._id;
    const date = format(new Date(orderState[i].createdAt), "dd-MM-yyy");
    data.push({
      key: i + 1,
      name: name,
      product: <Link to={`/admin/order/${id}`}>Hiện thị đơn hàng</Link>,
      status: statuspayment,
      date: date,
      action: (
        <>
          <Link to="/" className="fs-5">
            <BiEdit />
          </Link>
          <Link to="/" className="fs-5 ms-3">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Danh sách đơn hàng</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;
