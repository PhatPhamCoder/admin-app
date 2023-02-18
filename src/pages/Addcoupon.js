import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import { createCoupon, resetState } from '../features/coupon/couponSlice';

let userSchema = object().shape({
    name: string().required("Tiêu đề không được để trống"),
    expiry: date().required("Thời hạn không được để trống"),
    discount: number().required("Ngày không được để trống"),
});

const Addcoupon = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            expiry: "",
            discount: ""
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            dispatch(createCoupon(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 2000)
        },
    });

    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success('Thêm ưu đãi thành công!');
        }
        if (isError) {
            toast.error('Thêm ưu đãi thất bại!');
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <div>
            <h3 className='mb-4 title'>Thêm ưu đãi</h3>
            <div className="row">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="col-6">
                        <CustomInput
                            type="text"
                            label='Nhập tên ưu đãi'
                            name="name"
                            onChng={formik.handleChange("name")}
                            onBlr={formik.handleBlur("name")}
                            val={formik.values.name}
                            id="name"
                        />
                        <div className='error'>
                            {formik.touched.name && formik.errors.name}
                        </div>
                        <CustomInput
                            type="number"
                            label='Đặt giá trị giảm'
                            name="discount"
                            onChng={formik.handleChange("discount")}
                            onBlr={formik.handleBlur("discount")}
                            val={formik.values.discount}
                            id="discount"
                        />
                        <div className='error'>
                            {formik.touched.discount && formik.errors.discount}
                        </div>
                        <CustomInput
                            type="date"
                            label='Chọn ngày hết hạn'
                            name="expiry"
                            onChng={formik.handleChange("expiry")}
                            onBlr={formik.handleBlur("expiry")}
                            val={formik.values.expiry}
                            id="expiry"
                        />
                        <div className='error'>
                            {formik.touched.expiry && formik.errors.expiry}
                        </div>
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