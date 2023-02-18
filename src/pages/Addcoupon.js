import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { createBrand, resetState } from '../features/brand/brandSlice';

let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
});

const Addcoupon = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            dispatch(createBrand(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState);
            }, 2000)
        },
    });

    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand } = newBrand;
    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success('Thêm đối tác thành công!');
        }
        if (isError) {
            toast.error('Thêm đối tác thất bại!');
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <div>
            <h3 className='mb-4 title'>Thêm ưu đãi</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label='Nhập tên đối tác'
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
                        Thêm ưu đãi
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Addcoupon;