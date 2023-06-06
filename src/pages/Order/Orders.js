import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, updateOrders } from "../../features/auth/authSlice";
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
    title: "Giá trị đơn hàng",
    dataIndex: "totalPrice",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
  },
  {
    title: "Trạng Thái",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state?.auth?.orders?.orders);

  // Format Currency VND
  function formatCash(str) {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }

  const data = [];
  for (let i = 0; i < orderState?.length; i++) {
    const name =
      orderState[i]?.shippingInfo?.firstName +
      orderState[i]?.shippingInfo?.lastName;
    const date = format(new Date(orderState[i].createdAt), "dd-MM-yyy");
    data.push({
      key: i + 1,
      name: name,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>Chi tiết đơn hàng</Link>
      ),
      totalPrice: "đ" + formatCash(orderState[i]?.totalPrice),
      date: date,
      action: (
        <>
          <select
            onChange={(e) => updateOrderStatus(orderState[i]?._id, e)}
            defaultValue={orderState[i]?.orderStatus}
            className="form-control form-select"
          >
            <option value="Pending Confirm">Chờ xác nhận</option>
            <option value="Order Confirm">Xác nhận đơn hàng</option>
            <option value="Waiting To Ship">Chờ lấy hàng</option>
            <option value="Out For Shipping">Đang giao</option>
            <option value="Shipped">Đã giao</option>
            <option value="Cancel">Hủy</option>
            <option value="Refund Stock">Trả hàng</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (id, e) => {
    const status = e.target.value;
    dispatch(updateOrders({ id, status }));
  };

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
