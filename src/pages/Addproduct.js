import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { getBrands } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
// Upload Image
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
  description: string().required("Mô tả không được để trống"),
  price: number().required("Giá tiền không được để trống"),
  brand: string().required("Thương hiệu không được để trống"),
  category: string().required("Danh mục không được để trống"),
  tags: string().required("Thẻ không được để trống"),
  color: array()
    .min(1, "Chọn ít nhất 1 màu")
    .required("Màu không được bỏ trống"),
  quantity: number().required("Số lượng không được để trống"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(resetState());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const pCategoryState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Thêm sản phẩm thành công!");
    }
    if (isError) {
      toast.error("Thêm sản phẩm thất bại!");
    }
  }, [isSuccess, isError, isLoading]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      tags: "",
      quantity: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setImages(null);
      setTimeout(() => {
        dispatch(resetState);
      }, 2000);
    },
  });

  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Thêm sản phẩm</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <CustomInput
                type="text"
                label="Nhập tên sản phẩm"
                name="title"
                onChng={formik.handleChange("title")}
                onBlr={formik.handleBlur("title")}
                val={formik.values.title}
              />
            </div>
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <CustomInput
              type="number"
              label="Nhập giá sản phẩm"
              name="price"
              onChng={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              val={formik.values.brand}
              id=""
              className="form-control py-3 my-3"
            >
              {brandState.map((item, index) => {
                return (
                  <option value={item.title} key={index}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              val={formik.values.category}
              id=""
              className="form-control py-3 my-3"
            >
              <option value="">Lựa chọn danh mục</option>
              {pCategoryState.map((item, index) => {
                return (
                  <option value={item.title} key={index}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
          </div>
          <div className="col-6">
            <select
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              val={formik.values.tags}
              id=""
              className="form-control py-3 my-3"
            >
              <option value="" disabled>
                Nhập thẻ sản phẩm
              </option>
              <option value="Home Page">Home Page</option>
              <option value="Product Page">Product Page</option>
              <option value="More">More</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
          </div>
          <div className="col-6 mt-2">
            <CustomInput
              className="py-3 mb-3"
              type="number"
              label="Nhập số lượng sản phẩm"
              name="quantity"
              onChng={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>
          <div className="col-6 text-center" style={{ cursor: "pointer" }}>
            <div className="bg-white p-4 rounded mt-2">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Nhấn vào đây để tải file lên!</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
          <div className="col-6 mt-2">
            <div className="col-12 mb-2">
              <Select
                mode="multiple"
                allowClear
                className="w-100 p-0"
                placeholder="Lựa chọn màu sắc"
                defaultValue={color}
                onChange={(i) => handleColors(i)}
                options={coloropt}
              />
              <div className="error">
                {formik.touched.color && formik.errors.color}
              </div>
            </div>
            <div className="col-12">
              <Select
                mode="multiple"
                allowClear
                className="w-100 p-0"
                placeholder="Lựa chọn màu sắc"
                defaultValue={color}
                onChange={(i) => handleColors(i)}
                options={coloropt}
              />
              <div className="error">
                {formik.touched.color && formik.errors.color}
              </div>
            </div>
          </div>
          <div className="showimages my-3 d-flex">
            {imgState.map((item, index) => {
              return (
                <div key={index} className="position-relative">
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(item.public_id))}
                    className="btn-close position-absolute text-white"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={item.url} alt="" className="rounded" width={350} />
                </div>
              );
            })}
          </div>
          <div className="col-12">
            <div className="mb-3">
              <ReactQuill
                className="quill"
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className="col-12 d-flex align-items-center">
            <div className="mx-auto">
              <button
                className="btn btn-success"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                Thêm sản phẩm
              </button>
              <button className="btn btn-warning" type="submit">
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
