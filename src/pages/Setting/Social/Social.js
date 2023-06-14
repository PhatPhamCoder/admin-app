import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSocial,
  selectSocial,
  updateSocial,
} from "../../../features/Social/socialSlice";
import { HiOutlineMail } from "react-icons/hi";
import { BsFacebook, BsFillHddNetworkFill } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaRegAddressCard, FaTiktok } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import logo from "../../../images/avatar.png";
import { useFormik } from "formik";
import { object, string } from "yup";

let socialSchema = object().shape({
  facebook: string(),
  instagram: string(),
  phoneNumber: string(),
  tiktok: string(),
  email: string().email(),
  footer: string(),
  map: string(),
});

const Social = () => {
  const dispatch = useDispatch();
  const [isUpdate, SetIsUpdate] = useState(false);
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [tiktok, setTikTok] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [footer, setFooter] = useState();
  const [map, setMap] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facebook: facebook,
      instagram: instagram,
      phoneNumber: phoneNumber,
      tiktok: tiktok,
      email: email,
      address: address,
      footer: footer,
      map: map,
    },
    validationSchema: socialSchema,
  });

  useEffect(() => {
    dispatch(getAllSocial());
  }, [dispatch]);

  const socialState = useSelector(selectSocial);
  const { data } = socialState;

  const inputRef = useRef();

  const focus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focus();
    if (isUpdate) {
      if (data) {
        if (data?.[0]?.facebook !== undefined) {
          setFacebook(data?.[0]?.facebook);
        }
        if (data?.[0]?.instagram !== undefined) {
          setInstagram(data?.[0]?.instagram);
        }
        if (data?.[0]?.tiktok !== undefined) {
          setTikTok(data?.[0]?.tiktok);
        }
        if (data?.[0]?.email !== undefined) {
          setEmail(data?.[0]?.email);
        }
        if (data?.[0]?.phoneNumber !== undefined) {
          setPhoneNumber(data?.[0]?.phoneNumber);
        }
        if (data?.[0]?.address !== undefined) {
          setAddress(data?.[0]?.address);
        }
        if (data?.[0]?.footer !== undefined) {
          setFooter(data?.[0]?.footer);
        }
        if (data?.[0]?.map !== undefined) {
          setMap(data?.[0]?.map);
        }
      }
    }
  }, [data, isUpdate]);
  const handleReset = () => {
    formik.resetForm();
    SetIsUpdate(false);
  };

  const handleButton = () => {
    return (
      <>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => handleUpdate(e)}
        >
          Lưu
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => SetIsUpdate(false, formik.resetForm)}
        >
          Hủy
        </button>
        <button className="btn btn-check" type="button" onClick={handleReset}>
          Reset
        </button>
      </>
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let dataUpdate = {
      email: formik.values.email,
      facebook: formik.values.facebook,
      instagram: formik.values.instagram,
      phoneNumber: formik.values.phoneNumber,
      tiktok: formik.values.tiktok,
      address: formik.values.address,
      footer: formik.values.footer,
      map: formik.values.map,
    };
    dispatch(updateSocial(dataUpdate));
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="fs-2 fw-bold d-flex align-items-center gap-2">
              <BsFillHddNetworkFill />
              Quản lý mạng xã hội
            </h2>
          </div>
          <div className="col-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="col-12">
                <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                  <BsFacebook />
                  Facebook:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.facebook}
                  onChange={formik.handleChange("facebook")}
                  onBlur={formik.handleBlur("facebook")}
                />
              </div>
              <div className="col-12">
                <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                  <AiFillInstagram />
                  Instagram
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.instagram}
                  onChange={formik.handleChange("instagram")}
                  onBlur={formik.handleBlur("instagram")}
                />
              </div>
              <div className="col-12">
                <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                  <FaTiktok />
                  Tiktok
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.tiktok}
                  onChange={formik.handleChange("tiktok")}
                  onBlur={formik.handleBlur("tiktok")}
                />
              </div>
              <div className="col-12">
                <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                  <HiOutlineMail />
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
              </div>
              <div className="col-12">
                <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                  <GiSmartphone />
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange("phoneNumber")}
                  onBlur={formik.handleBlur("phoneNumber")}
                />
              </div>
              <div className="col-12">
                <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                  <FaRegAddressCard />
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
              </div>
              <div className="my-2 d-flex align-items-center gap-2">
                {!isUpdate ? (
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => SetIsUpdate(true)}
                  >
                    Hiển thị
                  </button>
                ) : (
                  handleButton()
                )}
              </div>
            </form>
          </div>
          <div className="col-6 row">
            <div className="col-12">
              <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                <FaRegAddressCard />
                Footer
              </label>
              <input
                type="text"
                className="form-control"
                value={formik.values.footer}
                onChange={formik.handleChange("footer")}
                onBlur={formik.handleBlur("footer")}
              />
            </div>
            <div className="col-12">
              <label className="my-2 fw-bold fs-5 ms-2 d-flex align-items-center justify-content-start gap-2">
                <FaRegAddressCard />
                Bản đồ
              </label>
              <textarea
                cols={4}
                rows={10}
                type="text"
                className="form-control"
                value={formik.values.map}
                onChange={formik.handleChange("map")}
                onBlur={formik.handleBlur("map")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
