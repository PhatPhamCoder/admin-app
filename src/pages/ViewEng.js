import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEnquiry,
  resetState,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import { id } from "date-fns/locale";
import { toast } from "react-toastify";

const ViewEng = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEngId = location.pathname.split("/")[3];

  const newEnquiry = useSelector((state) => state.enquiry);
  const {
    isSuccess,
    isError,
    isLoading,
    EnquiryName,
    EnquiryMobile,
    EnquiryEmail,
    EnquiryComment,
    EnquiryStatus,
  } = newEnquiry;

  useEffect(() => {
    if (getEngId !== undefined) {
      dispatch(getEnquiry(getEngId));
    } else {
      dispatch(resetState());
    }
  }, [getEngId]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getEnquiry(getEngId));
    }, 100);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="my-2 title">Thông tin chi tiết liên hệ</h3>
        <button
          className="bg-transparent border-0 d-flex align-items-center gap-1 fs-5 mb-0"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" />
          Go Back
        </button>
      </div>

      <div className="my-2 p-4 bg-white rounded-3 w-50">
        <div className="d-flex align-items-center gap-3 mb-2">
          <h6 className="mb-0">Họ và tên:</h6>
          <p className="mb-0">{EnquiryName}</p>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <h6 className="mb-0">Số điện thoại:</h6>
          <a href={`tel:{EnquiryMobile}`} className="mb-0 text-decoration-none">
            {EnquiryMobile}
          </a>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">{EnquiryEmail}</p>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <h6 className="mb-0">Bình luận:</h6>
          <p className="mb-0">{EnquiryComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <h6 className="mb-0">Trạng thái:</h6>
          <p className="mb-0">{EnquiryStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Thay đổi trạng thái:</h6>
          <select
            defaultValue={EnquiryStatus ? EnquiryStatus : "Đã nhận"}
            className="form-control form-select w-25"
            onChange={(e) => setEnquiryStatus(e.target.value, getEngId)}
          >
            <option value="Đã nhận">Đã nhận</option>
            <option value="Đã liên hệ">Đã liên hệ</option>
            <option value="Đang chờ xử lý">Đang chờ xử lý</option>
            <option value="Đã xử lý">Đã xử lý</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ViewEng;
