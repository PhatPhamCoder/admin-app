import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getEmail } from "../../features/email/EmailSlice";
import { CSVLink } from "react-csv";
import { BiExport } from "react-icons/bi";
const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Email",
    dataIndex: "email",
  },

  {
    title: "Ngày tạo",
    dataIndex: "date",
  },
];
const EmailMarketing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmail());
  }, []);

  const emailState = useSelector((state) => state?.email?.getEmail);
  // const dataExport = emailState.toString();
  // console.log(dataExport);

  const data = [];
  for (let i = 0; i < emailState?.length; i++) {
    const date = format(new Date(emailState[i].createdAt), "dd-MM-yyy");
    data.push({
      key: i + 1,
      email: emailState[i].email,
      date: date,
    });
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mb-4 title">Email nhận tin khuyến mãi</h3>
        {/* <CSVLink
          data={dataExport}
          filename={"Danh Sách Email Marketing.csv"}
          className="btn-primary text-white p-2 rounded text-decoration-none d-flex align-items-center gap-2 fw-bold"
        >
          Export Excel <BiExport size={30} />
        </CSVLink> */}
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default EmailMarketing;
