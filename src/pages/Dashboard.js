import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên Khách hàng",
    dataIndex: "name",
  },
  {
    title: "Số lượng sản phẩm",
    dataIndex: "quantity",
  },
  {
    title: "Địa chỉ giao hàng",
    dataIndex: "address",
  },
  {
    title: "Tổng tiền đơn hàng",
    dataIndex: "totalprice",
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  // Format Currency VND
  function formatCash(str) {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];

      data.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);
    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      console.log(orderState[i]?.orderStatus);
      data1.push({
        key: i,
        name:
          orderState[i]?.shippingInfo?.firstName +
          orderState[i]?.shippingInfo?.lastName,
        quantity: orderState[i]?.orderItems?.length,
        totalprice: "đ " + formatCash(orderState[i]?.totalPrice),
        address: orderState[i]?.shippingInfo?.address,
        status: (
          // <option value="Refund Stock">Trả hàng</option>
          <div>
            {orderState[i]?.orderStatus === "Đã đặt hàng" && (
              <div
                className="bg-success text-white rounded p-2 fw-bold"
                style={{ width: "fit-content" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
            {orderState[i]?.orderStatus === "Pending Confirm" && (
              <div
                className="bg-primary text-white rounded p-2 fw-bold"
                style={{ width: "fit-content" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
            {orderState[i]?.orderStatus === "Order Confirm" && (
              <div
                className="text-white rounded p-2 fw-bold"
                style={{ width: "fit-content", backgroundColor: "#FF8C00" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
            {orderState[i]?.orderStatus === "Waiting To Ship" && (
              <div
                className="bg-info text-white rounded p-2 fw-bold"
                style={{ width: "fit-content" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
            {orderState[i]?.orderStatus === "Out For Shipping" && (
              <div
                className="text-white rounded p-2 fw-bold"
                style={{ width: "fit-content", backgroundColor: "#39b652" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
            {orderState[i]?.orderStatus === "Shipped" && (
              <div
                className="bg-warning text-white rounded p-2 fw-bold"
                style={{ width: "fit-content" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
            {orderState[i]?.orderStatus === "Cancel" && (
              <div
                className="bg-danger text-white rounded p-2 fw-bold"
                style={{ width: "fit-content" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
            {orderState[i]?.orderStatus === "Refund Stock" && (
              <div
                className="text-white rounded p-2 fw-bold"
                style={{ width: "fit-content", backgroundColor: "#ff69b4" }}
              >
                {orderState[i]?.orderStatus}
              </div>
            )}
          </div>
        ),
      });
    }
    setOrderData(data1);
  }, [monthlyDataState, orderState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#1677ff"; //color column
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      sales: {
        alias: "Doanh thu",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#1677ff"; //color column
    },
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      sales: {
        alias: "Doanh thu",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc">Tổng cộng</p>
            <h4 className="mb-0 sub-title">{yearlyDataState?.[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 desc">
              So sánh đến tháng {new Date().getMonth() + 1}/2023
            </p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc">Tổng cộng</p>
            <h4 className="mb-0 sub-title">{yearlyDataState?.[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 50%
            </h6>
            <p className="mb-0 desc">
              So sánh đến tháng {new Date().getMonth() + 1}/2023
            </p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc">Tổng cộng</p>
            <h4 className="mb-0 sub-title">đ 200.000.000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">
              So sánh đến tháng {new Date().getMonth() + 1}/2023
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex flex-flex-grow-1">
        <div className="mt-4 w-50">
          <h3 className="mb-5">Phân tích doanh thu theo tháng</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 w-50">
          <h3 className="mb-5">Phân tích doanh thu bán ra</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-3">Đơn hàng mới nhất</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
