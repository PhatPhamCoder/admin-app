import { React, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import { getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
// import Multiselect
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";

import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';

let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
    desciption: string().required("Mô tả không được để trống"),
    price: number().required("Giá tiền không được để trống"),
    brand: string().required("Thương hiệu không được để trống"),
    category: string().required("Danh mục không được để trống"),
    quantity: number().required("Số lượng không được để trống"),
});

const Addproduct = () => {
    const dispatch = useDispatch();
    const [color, setColor] = useState([]);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
        formik.values.color = color
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const pCategoryState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const colors = [];
    colorState.forEach((i) => {
        colors.push({
            _id: i._id,
            color: i.title
        })
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            desciption: "",
            price: "",
            brand: "",
            category: "",
            color: "",
            quantity: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        },
    });

    //ReactQuill
    // const { desc } = useState();
    // const handleDesc = (e) => {
    //     setDesc(e);
    // }
    //ReactQuill End
    return (
        <div>
            <h3 className='mb-4 title'>Thêm sản phẩm</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <CustomInput
                            type='text'
                            label='Nhập tên sản phẩm'
                            name="title"
                            onChng={formik.handleChange("title")}
                            onBlr={formik.handleBlur("title")}
                            val={formik.values.title}
                        />
                    </div>
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className='mb-3'>
                        <ReactQuill
                            className='quill'
                            name="desciption"
                            onChange={formik.handleChange('desciption')}
                            value={formik.values.desciption}
                        />
                    </div>
                    <div className='error'>
                        {formik.touched.desciption && formik.errors.desciption}
                    </div>
                    <CustomInput
                        type='number'
                        label='Nhập giá sản phẩm'
                        name="price"
                        onChng={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className='error'>
                        {formik.touched.price && formik.errors.price}
                    </div>
                    <select
                        name="brand"
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        val={formik.values.brand}
                        id=""
                        className='form-control py-3 my-3'>
                        {brandState.map((item, index) => {
                            return (
                                <option value={item.title} key={index}>
                                    {item.title}
                                </option>
                            )
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.brand && formik.errors.brand}
                    </div>
                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        val={formik.values.category}
                        id=""
                        className='form-control py-3 my-3'
                    >
                        {pCategoryState.map((item, index) => {
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
                    <select name="" id="" className='form-control py-3 mb-3'>
                        <option value="">
                            Lựa chọn loại giấy
                        </option>
                    </select>
                    <Multiselect
                        name='color'
                        className='py-3 mb-3'
                        dataKey="id"
                        textField="color"
                        data={colors}
                        onChange={(event) => setColor(event)}
                    />
                    <div className='error'>
                        {formik.touched.color && formik.errors.color}
                    </div>
                    <CustomInput
                        className='py-3 mb-3'
                        type='number'
                        label='Nhập số lượng sản phẩm'
                        name="quantity"
                        onChng={formik.handleChange("quantity")}
                        onBlr={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                    />
                    <div className='error'>
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className='bg-white border-1 p-5 text-center mt-3 rounded'>
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
                    <div className='showimages my-3 d-flex'>
                        {imgState.map((item, index) => {
                            return (
                                <div key={index} className="position-relative">
                                    <button
                                        onClick={() => dispatch(deleteImg(item.public_id))}
                                        className='btn-close position-absolute text-white'
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={item.url} alt="" className='rounded' width={350} />
                                </div>
                            )
                        })}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-3 d-flex mx-auto'
                        type='submit'
                    >
                        Thêm sản phẩm
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Addproduct;