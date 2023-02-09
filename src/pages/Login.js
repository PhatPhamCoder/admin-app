import React from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../components/CustomInput';

const Login = () => {
    return (
        <div className='login-container py-5'>
            <br />
            <br />
            <br />
            <br />
            <div className='login-body my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <form action="">
                    <h3 className='text-center'>Đăng nhập hệ thống</h3>
                    <p className='text-center'>Dùng tài khoản quản trị để đăng nhập</p>
                    <CustomInput type="text" label="Email Address" id="email" />
                    <CustomInput type="password" label="Password" id="pass" />
                    <div className='mb-3 text-end'>
                        <Link to="forgot-password" className='text-decoration-none text-dark'>Quên mật khẩu?</Link>
                    </div>
                    <Link
                        to="/admin"
                        className='button border-0 px-3 py-2 text-white fw-bold d-flex text-center text-decoration-none fs-5'
                        type="submit"
                    >Đăng nhập
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login