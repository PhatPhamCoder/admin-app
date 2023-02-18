import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { createBlogCategory, resetState } from '../features/bcategory/bcategorySlice';

let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
});


const Addblogcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            dispatch(createBlogCategory(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
            }, 2000)
        },
    });

    const newBlogCategory = useSelector((state) => state.bCategory);
    const { isSuccess, isError, isLoading, createdBlogCategory } = newBlogCategory;
    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success('Thêm danh mục thành công!');
        }
        if (isError) {
            toast.error('Thêm danh mục thất bại!');
        }
    }, [isSuccess, isError, isLoading]);
    return (
        <div>
            <h3 className='mb-4 title'>Thêm danh mục bài viết</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label='Nhập tên danh mục bài viết'
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
                        Thêm danh mục bài viết
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblogcat