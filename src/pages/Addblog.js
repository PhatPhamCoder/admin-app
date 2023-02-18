import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// Upload Image
import Dropzone from 'react-dropzone';
// import { InboxOutlined } from '@ant-design/icons';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createBlog } from '../features/blogs/blogSlice'
// Upload import end
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { getCategories } from '../features/bcategory/bcategorySlice';

let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
    description: string().required("Mô tả không được để trống"),
    category: string().required("Danh mục không được để trống"),
});

const Addblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [images, setImages] = useState([]);

    const imgState = useSelector((state) => state.upload.images);
    const bCategoryState = useSelector((state) => state.bCategory.bCategories);

    const newBlog = useSelector((state) => state.blog);
    const { isSuccess, isError, isLoading, createdBlog } = newBlog;
    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success('Thêm bài viết thành công!');
        }
        if (isError) {
            toast.error('Thêm bài viết thất bại!');
        }
    }, [isSuccess, isError, isLoading]);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url
        })
    });

    useEffect(() => {
        formik.values.images = img;
    }, [img]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            images: ""
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values))
            dispatch(createBlog(values));
            formik.resetForm();
            setImages(null);
            setTimeout(() => {
                navigate("/admin/blog-list")
            }, 2000)
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Thêm bài viết</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <CustomInput
                                            type='text'
                                            label='Nhập tiêu đề bài viết'
                                            name="title"
                                            onChng={formik.handleChange("title")}
                                            onBlr={formik.handleBlur("title")}
                                            val={formik.values.title}
                                        />
                                        <div className='error'>
                                            {formik.touched.title && formik.errors.title}
                                        </div>
                                    </div>

                                </div>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <select
                                            name="category"
                                            onChange={formik.handleChange("category")}
                                            onBlur={formik.handleBlur("category")}
                                            value={formik.values.category}
                                            id=""
                                            className='form-control py-3 mt-2'
                                        >
                                            <option value="">Lựa chọn danh mục</option>
                                            {bCategoryState.map((item, index) => {
                                                return (
                                                    <option value={item.title} key={index}>
                                                        {item.title}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        <div className='error'>
                                            {formik.touched.category && formik.errors.category}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 bg-white border-1 p-5 text-center mt-3 rounded'>
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className='col-12 showimages my-3 d-flex'>
                        {imgState.map((item, index) => {
                            return (
                                <div key={index} className="position-relative">
                                    <button
                                        type='button'
                                        onClick={() => dispatch(deleteImg(item.public_id))}
                                        className='btn-close position-absolute text-white'
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={item.url} alt="" className='rounded' width={350} />
                                </div>
                            )
                        })}
                    </div>
                    <div className='mb-3'>
                        <ReactQuill
                            className='quill'
                            name="description"
                            onChange={formik.handleChange('description')}
                            value={formik.values.description}
                        />
                    </div>
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-2 d-flex mx-auto'
                        type='submit'
                    >
                        Thêm bài viết
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblog