import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/customers/customerSlice";
import { format } from "date-fns";
import { statusUser } from "../../features/auth/authSlice";
const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleStatus = async (e, _id) => {
    const isBlocked = e.target.value;
    await dispatch(statusUser({ _id, isBlocked }));
  };
  const customerState = useSelector((state) => state?.customer?.customers);
  const data = [];
  for (let i = 0; i < customerState?.length; i++) {
    const date = format(new Date(customerState[i].createdAt), "dd-MM-yyy");
    data.push({
      key: i + 1,
      name: customerState[i].firstname,
      email: customerState[i].email,
      mobile: customerState[i].mobile,
      status: (
        <div className="d-flex text-center gap-2 align-items-center">
          <select
            className="form-select"
            value={customerState[i]?.isBlocked}
            onChange={(e) => handleStatus(e, customerState[i]._id)}
          >
            <option value="1">Active</option>
            <option value="0">Block</option>
          </select>
          {/* <input
            type="checkbox"
            className="form-check-input d-flex text-center"
            checked={customerState[i] === false}
            onChange={(e) => handleStatus(e, customerState[i]._id)}
          />
          <div className="fs-5">
            {!customerState[i] ? (
              <div className="text-primary fw-bold">Active</div>
            ) : (
              <div className="text-danger fw-bold">No Active</div>
            )}
          </div> */}
        </div>
      ),
      date: date,
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Danh sách khách hàng</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Customers;
