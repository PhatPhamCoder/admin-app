import React from 'react'
import CustomInput from '../components/CustomInput'

const Addbranch = () => {
    return (
        <div>
            <h3 className='mb-4 title'>Thêm đối tác</h3>
            <div>
                <form action="">
                    <CustomInput type="text" label='Nhập thêm đối tác' />
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Thêm đối tác
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addbranch;