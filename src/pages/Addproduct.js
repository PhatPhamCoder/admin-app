import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { array, object, string } from 'yup';
import { getBrands } from '../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/pcategory/pcategorySlice';
import Multiselect from "react-widgets/Multiselect";
import { getColors } from '../features/color/colorSlice';
import "react-widgets/styles.css";
let userSchema = object().shape({
    title: string().required("Tiêu đề không được để trống"),
    desciption: string().required("Mô tả không được để trống"),
    price: string().required("Giá tiền không được để trống"),
    brand: string().required("Thương hiệu không được để trống"),
    category: string().required("Danh mục không được để trống"),
    color: array().required("Màu sắc không được để trống"),
});

const Addproduct = () => {
    const dispatch = useDispatch();
    const [color, setColor] = useState([]);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, []);
    const brandState = useSelector((state) => state.brand.brands);
    const pCategoryState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const colors = [];
    colorState.forEach((i) => {
        colors.push({
            _id: i._id,
            color: i.title
        })
    })
    const formik = useFormik({
        initialValues: {
            title: "",
            desciption: "",
            price: "",
            brand: "",
            category: "",
            color: ""
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        },
    });

    const { desc, setDesc } = useState();
    const handleDesc = (e) => {
        setDesc(e);
    }

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
                            value={desc}
                            name="desciption"
                            onChange={(e) => formik.handleDesc('desciption', e)}
                            values={formik.values.desciption}
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
                        values={formik.values.color}
                    />
                    <div className='error'>
                        {formik.touched.color && formik.errors.color}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 mb-5'
                        type='submit'
                    >
                        Thêm sản phẩm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addproduct;