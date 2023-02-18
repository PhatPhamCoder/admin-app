import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { createCategory, resetState } from '../features/pcategory/pcategorySlice';



let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
});


const Addcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            dispatch(createCategory(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState);
            }, 2000)
        },
    });

    const newCategory = useSelector((state) => state.pCategory);
    const { isSuccess, isError, isLoading, createdCategory } = newCategory;
    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success('Thêm đối tác thành công!');
        }
        if (isError) {
            toast.error('Thêm đối tác thất bại!');
        }
    }, [isSuccess, isError, isLoading]);
    return (
        <div>
            <h3 className='mb-4 title'>Thêm danh mục</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label='Nhập tên danh mục sản phẩm'
                        name="title"
                        onChng={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-5 d-flex mx-auto'
                        type='submit'
                    >
                        Thêm danh mục
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addcat