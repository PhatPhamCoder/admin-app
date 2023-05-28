import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="login-container py-5">
      <br />
      <br />
      <br />
      <br />
      <div className="login-body my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <form action="">
          <h3 className="text-center">Quên mật khẩu</h3>
          <p className="text-center">Nhập email để gửi mã xác nhận</p>
          <CustomInput type="text" label="Email Address" id="email" />
          <button
            className="button border-0 px-3 py-2 text-white fw-bold d-flex text-center"
            type="submit"
          >
            Gửi mã
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
