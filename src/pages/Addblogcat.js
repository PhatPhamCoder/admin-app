import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { createBlogCategory, getBlogCat, resetState, updateBlogCat } from '../features/bcategory/bcategorySlice';

let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
});

const Addblogcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogCatId = location.pathname.split("/")[3];
    const newBlogCategory = useSelector((state) => state.bCategory);
    const { isSuccess, isError, isLoading, createdBlogCategory, BlogCatName, updetedBlogCategory } = newBlogCategory;

    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success('Thêm danh mục thành công!');
        }

        if (isSuccess && updetedBlogCategory) {
            toast.success('Cập nhật danh mục thành công!');
            navigate("/admin/blog-category-list");
        }

        if (isError) {
            toast.error('Thêm danh mục thất bại!');
        }
    }, [isSuccess, isError, isLoading]);

    useEffect(() => {
        if (getBlogCatId !== undefined) {
            dispatch(getBlogCat(getBlogCatId));
        } else {
            dispatch(resetState());
        }
    }, [getBlogCatId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: BlogCatName || "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            if (getBlogCatId !== undefined) {
                const data = { id: getBlogCatId, blogCatData: values }
                dispatch(updateBlogCat(data));
                dispatch(resetState());
            } else {
                dispatch(createBlogCategory(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                }, 300)
            }
        },
    });


    return (
        <div>
            <h3 className='mb-4 title'>{getBlogCatId !== undefined ? "Cập nhật" : "Thêm"} danh mục bài viết</h3>
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
                        {getBlogCatId !== undefined ? "Cập nhật" : "Thêm"} danh mục bài viết
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblogcat