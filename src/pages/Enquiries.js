import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "SĐT",
    dataIndex: "mobile",
  },
  {
    title: "Nội dung",
    dataIndex: "comment",
  },
  {
    title: "Ngày nhận",
    dataIndex: "date",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Chức năng",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data = [];
  for (let i = 0; i < enquiryState.length; i++) {
    const name = enquiryState[i].name;
    const email = enquiryState[i].email;
    const mobile = enquiryState[i].mobile;
    const comment = enquiryState[i].comment;
    const date = format(new Date(enquiryState[i].createdAt), "dd-MM-yyy");
    const id = enquiryState[i]._id;
    const status = enquiryState[i].status;
    data.push({
      key: i + 1,
      name: name,
      email: email,
      mobile: mobile,
      comment: comment,
      date: date,
      status: (
        <>
          <select
            name=""
            id=""
            defaultValue={status ? status : "Đã nhận"}
            className="form-control form-select fit-content"
            onChange={(e) => setEnquiryStatus(e.target.value, id)}
          >
            <option value="Đã nhận">Đã nhận</option>
            <option value="Đã liên hệ">Đã liên hệ</option>
            <option value="Đang chờ xử lý">Đang chờ xử lý</option>
            <option value="Đã xử lý">Đã xử lý</option>
          </select>
        </>
      ),
      action: (
        <div className="d-flex">
          <Link to={`/admin/enquiries/${id}`} className="fs-4 ms-2">
            <AiOutlineEye />
          </Link>
          <button
            onClick={() => showModal(id)}
            className="fs-4 ms-2 bg-transparent border-0 text-danger"
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateEnquiry(data));
  };

  return (
    <div>
      <h3 className="mb-4 title">Danh sách gửi liên hệ</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnquiry(enqId);
        }}
        title="Bạn có chắc mà muốn xóa liên hệ này!"
      />
    </div>
  );
};

export default Enquiries;
