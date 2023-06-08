import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleOrder } from "../../features/auth/authSlice";
import { BsArrowLeft } from "react-icons/bs";

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
    title: "Số lượng",
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
  const navigate = useNavigate();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState("");
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < orderState?.orderItems?.length; index++) {
      sum =
        sum +
        Number(orderState?.orderItems[index]?.quantity) *
          Number(orderState?.orderItems[index]?.price);
      setTotalAmount(sum);
    }
  }, [orderState]);

  const data = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      }),
      date: new Date(orderState?.createdAt).toLocaleString(),
      Price: (
        orderState?.orderItems[i]?.quantity * orderState?.orderItems[i]?.price
      ).toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      }),
      address:
        orderState?.shippingInfo?.address + orderState?.shippingInfo?.city,
    });
  }
  return (
    <div>
      <div
        className="d-flex align-items-center gap-1"
        style={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin/orders")}
      >
        <BsArrowLeft size={20} />
        Quay lại danh danh sách
      </div>
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
          {totalAmount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h3>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;
