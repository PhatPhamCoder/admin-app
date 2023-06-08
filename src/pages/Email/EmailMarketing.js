import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getEmail } from "../../features/email/EmailSlice";
import Search from "./Search";
import { axiosClient } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";
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
  const [dataSearch, setDataSearch] = useState({});
  console.log(dataSearch);
  const getTokenfromLocalStorage = localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null;

  const configCheckOut = {
    headers: {
      Authorization: `Bearer ${
        getTokenfromLocalStorage !== null ? getTokenfromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };
  const getData = () => {
    dispatch(getEmail());
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emailState = useSelector((state) => state?.email?.data?.getAllEmail);

  // Search
  const handleSearch = (keySearch) => {
    axiosClient
      .get(`${base_url}email/search-email?keyword=${keySearch}`, configCheckOut)
      .then((res) => setDataSearch(res?.data?.search))
      .catch((err) => console.log(err));
    getData();
  };

  const data = [];
  if (dataSearch?.length > 0) {
    for (let i = 0; i < dataSearch?.length; i++) {
      data.push({
        key: i + 1,
        email: dataSearch[i]?.email,
        date: format(new Date(dataSearch[i]?.createdAt), "dd-MM-yyy"),
      });
    }
  } else {
    for (let i = 0; i < emailState?.length; i++) {
      const date = format(new Date(emailState[i].createdAt), "dd-MM-yyy");
      data.push({
        key: i + 1,
        email: emailState[i]?.email,
        date: date,
      });
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mb-4 title">Email nhận tin khuyến mãi</h3>
        <div>
          <Search handleSearch={handleSearch} />
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default EmailMarketing;
