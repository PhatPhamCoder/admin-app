import React from 'react';
import CustomInput from '../components/CustomInput';

const Resetpassword = () => {
    return (
        <div className='login-container py-5'>
            <br />
            <br />
            <br />
            <br />
            <div className='login-body my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <form action="">
                    <h3 className='text-center'>Đặt lại mật khẩu</h3>
                    <p className='text-center'>Vui lòng nhập mật khẩu mới</p>
                    <CustomInput type="password" label="New Password" id="pass" />
                    <CustomInput type="password" label="Confirm Password" id="pass" />
                    <button
                        className=' button border-0 px-3 py-2 text-white fw-bold d-flex text-center'
                        type="submit"
                    >Đặt lại mật khẩu
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Resetpassword;