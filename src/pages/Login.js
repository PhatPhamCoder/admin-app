import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userSchema = object({
        email: string()
            .email("Email nên đúng cú pháp")
            .required("Nhập đúng định dạng email"),
        password: string().required("Vui lòng nhập mật khẩu")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            dispatch(login(values))
            // alert(JSON.stringify(values, null, 2));
        },
    });
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!user || isSuccess) {
            navigate("admin")
        } else {
            alert("Vui Lòng đăng nhập")
        }
    }, [user, isLoading, isError, isSuccess, message]);

    return (
        <div className='login-container py-5'>
            <div className='login-body my-5 bg-white mx-auto p-4'>
                <form action="" onSubmit={formik.handleSubmit}>
                    <h3 className='text-center fw-bold'>Đăng nhập hệ thống</h3>
                    <p className='text-center'>Dùng tài khoản quản trị để đăng nhập</p>
                    <CustomInput
                        type="text"
                        name='email'
                        label="Email Address"
                        id="email"
                        val={formik.values.email}
                        onCh={formik.handleChange('email')}
                    />
                    <div className='error'>
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="password"
                        name='password'
                        label="Password"
                        id="pass"
                        val={formik.values.password}
                        onCh={formik.handleChange('password')}
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className='mb-3 text-end'>
                        <Link
                            to="forgot-password"
                            className='text-decoration-none fs-6 text-dark mt-4'
                        >Quên mật khẩu?</Link>
                    </div>
                    <button
                        className='button border-0 px-3 py-2 text-white fw-bold d-flex text-center text-decoration-none fs-5'
                        type="submit"
                    >Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login