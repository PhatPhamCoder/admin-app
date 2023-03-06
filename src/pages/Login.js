import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let userSchema = object().shape({
  email: string()
    .email("Email nên đúng cú pháp")
    .required("Nhập đúng định dạng email"),
  password: string().required("Vui lòng nhập mật khẩu"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state.auth);

  const { user, isLoading, isError, isSuccess, message } = authState;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess]);

  return (
    <div className="login-container py-5">
      <div className="login-body my-5 bg-white mx-auto p-4">
        <h3 className="text-center fw-bold">Đăng nhập hệ thống</h3>
        <p className="text-center">Dùng tài khoản quản trị để đăng nhập</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
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
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="pass"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link
              to="forgot-password"
              className="text-decoration-none fs-6 text-dark mt-4"
            >
              Quên mật khẩu?
            </Link>
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
