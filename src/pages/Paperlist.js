import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { format } from "date-fns";
import CustomModal from "../components/CustomModal";
import {
  getPapers,
  resetState,
  deletePaper,
} from "../features/paper/paperSlice";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên loai giấy",
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

const Paperlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [paperId, setPaperId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPaperId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getPapers());
  }, []);
  const paperState = useSelector((state) => state.paper.papers);

  const data = [];
  for (let i = 0; i < paperState.length; i++) {
    const date = format(new Date(paperState[i].createdAt), "dd-MM-yyy");
    const name = paperState[i].title;
    const id = paperState[i]._id;
    data.push({
      key: i + 1,
      name: name,
      date: date,
      action: (
        <>
          <Link to={`/admin/paper/${id}`} className="fs-5">
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

  const deleteAPaper = (e) => {
    dispatch(deletePaper(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getPapers());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách khổ giấy</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAPaper(paperId);
        }}
        title="Bạn có chắc mà muốn xóa khổ giấy này!"
      />
    </div>
  );
};

export default Paperlist;
