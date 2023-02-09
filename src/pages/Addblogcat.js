import React from 'react'
import CustomInput from '../components/CustomInput'

const Addblogcat = () => {
    return (
        <div>
            <h3 className='mb-4 title'>Thêm danh mục bài viết</h3>
            <div>
                <form action="">
                    <CustomInput type="text" label='Nhập danh mục bài viết' />
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Thêm danh mục bài viết
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblogcat