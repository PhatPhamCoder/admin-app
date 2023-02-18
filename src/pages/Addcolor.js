import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { createColor } from '../features/color/colorSlice';

let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
});

const Addcolor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            dispatch(createColor(values));
            formik.resetForm();
            setTimeout(() => {
                navigate("/admin/list-color")
            }, 2000)
        },
    });

    const newColor = useSelector((state) => state.color);
    const { isSuccess, isError, isLoading, createdColor } = newColor;
    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success('Thêm màu thành công!');
        }
        if (isError) {
            toast.error('Thêm màu thất bại!');
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <div>
            <h3 className='mb-4 title'>Thêm màu sắc</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="color"
                        label='Chọn màu sắc'
                        name="title"
                        onChng={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Thêm màu sắc
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addcolor