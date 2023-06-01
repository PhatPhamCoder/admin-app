import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, selectAuth } from "../../features/auth/authSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
let userSchema = object().shape({
  email: string()
    .email("Email nên đúng cú pháp")
    .required("Nhập đúng định dạng email"),
  password: string().required("Vui lòng nhập mật khẩu"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(loginAdmin(values));
    },
  });
  const authState = useSelector(selectAuth);

  const { isLoading, isError, isSuccess, message } = authState;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [isLoading, isError, isSuccess]);

  return (
    <div className="login-container py-5">
      <div className="login-body my-5 bg-white mx-auto p-4">
        <h3 className="text-center fw-bold">Đăng nhập hệ thống</h3>
        <p className="text-center">Dùng tài khoản quản trị để đăng nhập</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              name="email"
              label="Email Address"
              id="email"
              onChng={formik.handleChange("email")}
              onBlr={formik.handleBlur("email")}
              val={formik.values.email}
            />
            <div className="error mt-2">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <div className="d-flex flex-column text-left position-relative">
            <CustomInput
              type={isHidden ? "text" : "password"}
              name="password"
              label="Password"
              id="pass"
              onChng={formik.handleChange("password")}
              onBlr={formik.handleBlur("password")}
              val={formik.values.password}
            />
            <div
              className="position-absolute hidden-password"
              onClick={() => setIsHidden(!isHidden)}
              style={{ right: "1rem", top: "1.5rem" }}
            >
              {!isHidden ? (
                <AiFillEye size={30} />
              ) : (
                <AiFillEyeInvisible size={30} />
              )}
            </div>
            <div className="text-danger mt-1">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <button
            className="button border-0 px-3 py-2 text-white fw-bold d-flex text-center text-decoration-none fs-5"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
