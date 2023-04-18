import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSingleOrder } from "../features/auth/authSlice";
import Currency from "react-currency-formatter";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Số lượng sản phẩm",
    dataIndex: "count",
  },
  {
    title: "Giá bán",
    dataIndex: "amount",
  },
  {
    title: "Địa chỉ giao hàng",
    dataIndex: "address",
  },
  {
    title: "Thành tiền",
    dataIndex: "Price",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);
  const data = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
      date: new Date(orderState?.createdAt).toLocaleString(),
      Price:
        orderState?.orderItems[i]?.quantity * orderState?.orderItems[i]?.price,
      address:
        orderState?.shippingInfo?.address + orderState?.shippingInfo?.city,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Đơn hàng chi tiết</h3>
      <div
        className="mb-3"
        style={{
          color: "white",
          border: "1px solid",
          borderRadius: "10px",
          padding: "5px",
          backgroundColor: "#001529",
        }}
      >
        <h3
          className="fs-3 d-flex align-items-center justify-content-end gap-2 p-2"
          style={{ width: "fit-content" }}
        >
          <div>Tổng giá trị đơn hàng:</div>
          <Currency
            quantity={orderState?.totalPrice}
            currency="VND"
            locale="vi_VN"
            pattern="##,### !"
            decimal=","
            group="."
          />
        </h3>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;
