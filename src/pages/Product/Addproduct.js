import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  createProducts,
  getProduct,
  resetState,
  selectProduct,
  updateProduct,
} from "../../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "../../utils/Editor";
import { BsArrowLeft } from "react-icons/bs";
import CustomInput from "../../components/CustomInput";
import { deleteImage, uploadImg } from "../../features/upload/uploadSlice";
import { getBrands } from "../../features/brand/brandSlice";
import { getCategories } from "../../features/pcategory/pcategorySlice";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Spinner from "../../components/Spinner";

let userSchema = object().shape({
  title: string().required("Tiêu đề không được để trống"),
  slug: string().required("Dữ liệu bắt buộc"),
  codeProduct: string().required("Mã sản sản phẩm không được để trống"),
  description: string().required("Mô tả không được để trống"),
  price: number().required("Giá tiền không được để trống"),
  discount: number(),
  category: string().required("Danh mục không được để trống"),
  brand: string().required("Thương hiệu không được để trống"),
  tags: string().required("Thẻ không được để trống"),
  quantity: number().required("Số lượng không được để trống"),
  pageNumber: number().required("Dữ liệu bắt buộc"),
  kindOfPaper: string().required("Dữ liệu bắt buộc"),
  paperSize: string().required("Dữ liệu bắt buộc"),
  dateSale: string,
  images: array(),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductSlug = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getProduct(getProductSlug));
    dispatch(getBrands());
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const productState = useSelector(selectProduct);
  // console.log("Check data product", productState);

  const brandState = useSelector((state) => state?.brand?.brands);
  const pCategoryState = useSelector((state) => state?.pCategory?.pCategories);
  const imgState = useSelector((state) => state?.upload?.images);
  const loadingImg = useSelector((state) => state?.upload);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const {
    productBrand,
    productCategory,
    productCodeProduct,
    productDesc,
    productName,
    productPrice,
    productDiscount,
    productQuantity,
    productTags,
    productSlug,
    productPage,
    productSize,
    productKindOfPaper,
    images,
    productId,
    dateSale,
  } = productState;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName || "",
      slug: productSlug || "",
      codeProduct: productCodeProduct || "",
      description: productDesc || "",
      price: productPrice || "",
      discount: productDiscount || "",
      brand: productBrand || "",
      category: productCategory || "",
      tags: productTags || "",
      quantity: productQuantity || "",
      pageNumber: productPage || "",
      kindOfPaper: productKindOfPaper || "",
      paperSize: productSize || "",
      dateSale: dateSale || "",
      images: [],
    },
    validationSchema: userSchema,
  });

  // create Product
  const handleAddData = async () => {
    let data = {
      title: formik.values.title,
      slug: formik.values.slug,
      codeProduct: formik.values.codeProduct,
      description: formik.values.description,
      price: formik.values.price,
      discount: formik.values.discount,
      brand: formik.values.brand,
      category: formik.values.category,
      tags: formik.values.tags,
      quantity: formik.values.quantity,
      pageNumber: formik.values.pageNumber,
      kindOfPaper: formik.values.kindOfPaper,
      paperSize: formik.values.paperSize,
      images: img,
    };
    // console.log(data);
    await dispatch(createProducts(data));
  };

  // Update Product
  const handleUpdateData = async () => {
    let productData = {
      id: productId,
      title: formik.values.title,
      slug: formik.values.slug,
      codeProduct: formik.values.codeProduct,
      description: formik.values.description,
      price: formik.values.price,
      discount: formik.values.discount,
      brand: formik.values.brand,
      category: formik.values.category,
      tags: formik.values.tags,
      quantity: formik.values.quantity,
      pageNumber: formik.values.pageNumber,
      kindOfPaper: formik.values.kindOfPaper,
      paperSize: formik.values.paperSize,
      images: img,
    };
    // console.log("Check data update", productData);
    await dispatch(updateProduct(productData));
  };

  useEffect(() => {
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const handleDeleteImg = async (public_id) => {
    await dispatch(deleteImage(public_id));
  };

  const showButton = () => {
    if (getProductSlug !== undefined) {
      return (
        <button
          onClick={() => handleUpdateData()}
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Cập nhật
        </button>
      );
    } else {
      return (
        <button
          onClick={() => handleAddData()}
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Thêm
        </button>
      );
    }
  };

  const handleReset = () => {
    dispatch(resetState());
    formik.resetForm();
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    dispatch(uploadImg(files));
  };

  return (
    <div>
      <div>
        <div
          className="d-flex align-items-center gap-1"
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin/list-product")}
        >
          <BsArrowLeft size={20} />
          Quay lại danh danh sách
        </div>
        <h3 className="my-2 title">
          {getProductSlug !== undefined ? "Cập nhật" : "Thêm"} sản phẩm
        </h3>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} className="row">
          <div className="col-12 col-md-6">
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              val={formik.values.brand}
              className="form-control py-3 mt-2"
            >
              <option value="">Chọn Thương hiệu</option>
              {brandState &&
                brandState.map((item, index) => {
                  return (
                    <option value={item?.title} key={index}>
                      {item?.title}
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
              className="form-control py-3 mt-2"
              // multiple
            >
              <option value="">Lựa chọn danh mục</option>
              {pCategoryState &&
                pCategoryState.map((item, index) => {
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
          <div className="col-12 col-md-6">
            <CustomInput
              type="text"
              label="Nhập tên sản phẩm"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <CustomInput
              type="text"
              label="Nhập slug sản phẩm"
              name="slug"
              onChng={formik.handleChange("slug")}
              onBlr={formik.handleBlur("slug")}
              val={
                (formik.values.slug = formik.values.title
                  .toLowerCase()
                  .trim()
                  .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                  .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                  .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                  .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
                  .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                  .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                  .replace(/đ/g, "d")
                  .replace(/[^\w\s-]/g, "")
                  .replace(/[\s_-]+/g, "-")
                  .replace(/^-+|-+$/g, ""))
              }
            />
            <div className="error">
              {formik.touched.slug && formik.errors.slug}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <CustomInput
              type="text"
              label="Nhập mã sản phẩm"
              name="codeProduct"
              onChng={formik.handleChange("codeProduct")}
              onBlr={formik.handleBlur("codeProduct")}
              val={formik.values.codeProduct}
            />
            <div className="error">
              {formik.touched.codeProduct && formik.errors.codeProduct}
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
            <CustomInput
              type="number"
              label="Nhập giá giảm"
              name="discount"
              onChng={formik.handleChange("discount")}
              onBlr={formik.handleBlur("discount")}
              val={formik.values.discount}
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <select
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              val={formik.values.tags}
              className="form-control py-3 mt-2"
            >
              <option value="">Chọn thẻ sản phẩm</option>
              <option value="Home Page">Home Page</option>
              <option value="Product Page">Product Page</option>
              <option value="Flash Sale">Flash Sale</option>
              <option value="More">More</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
          </div>
          <div className="col-12 col-md-6">
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
          <div className="col-12 col-md-6">
            <CustomInput
              className="py-3 mb-3"
              type="number"
              label="Nhập số trang"
              name="pageNumber"
              onChng={formik.handleChange("pageNumber")}
              onBlr={formik.handleBlur("pageNumber")}
              val={formik.values.pageNumber}
            />
            <div className="error">
              {formik.touched.pageNumber && formik.errors.pageNumber}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <CustomInput
              className="py-3 mb-3"
              type="text"
              label="Nhập loại giấy"
              name="kindOfPaper"
              onChng={formik.handleChange("kindOfPaper")}
              onBlr={formik.handleBlur("kindOfPaper")}
              val={formik.values.kindOfPaper}
            />
            <div className="error">
              {formik.touched.kindOfPaper && formik.errors.kindOfPaper}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <CustomInput
              className="py-3 mb-3"
              type="text"
              label="Nhập khổ giấy"
              name="paperSize"
              onChng={formik.handleChange("paperSize")}
              onBlr={formik.handleBlur("paperSize")}
              val={formik.values.paperSize}
            />
            <div className="error">
              {formik.touched.paperSize && formik.errors.paperSize}
            </div>
          </div>
          <div className="col-12 row my-2">
            <div className="col-3 w-25 h-25 text-center">
              <div className="bg-white py-5 rounded">
                <label
                  htmlFor="upload"
                  className="fs-4 fw-bold d-flex flex-column align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <AiOutlineCloudUpload size={50} /> Tải ảnh sản phẩm
                  {loadingImg?.isLoading === true && <Spinner />}
                </label>
                <input
                  id="upload"
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => handleUpload(e)}
                />
              </div>
            </div>
            <div className="col-9 mb-3 d-flex gap-3 flex-wrap">
              {getProductSlug === undefined
                ? imgState?.map((item, index) => {
                    return (
                      <div key={index} className="position-relative">
                        <button
                          type="button"
                          onClick={() => handleDeleteImg(item?.public_id)}
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px", color: "#fff" }}
                        />
                        <img
                          src={item?.url}
                          alt="Banner Product"
                          className="rounded"
                          width={250}
                        />
                      </div>
                    );
                  })
                : imgState?.map((item, index) => {
                    return (
                      <div key={index} className="position-relative">
                        <button
                          type="button"
                          onClick={() => handleDeleteImg(item?.public_id)}
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px", color: "#fff" }}
                        />
                        <img
                          src={item?.url}
                          alt="Banner Product"
                          className="rounded"
                          width={250}
                        />
                      </div>
                    );
                  }) &&
                  images?.map((item, index) => {
                    return (
                      <div key={index} className="position-relative">
                        <button
                          type="button"
                          onClick={() => handleDeleteImg(item?.public_id)}
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px", color: "#fff" }}
                        />
                        <img
                          src={item?.url}
                          alt="Banner Product"
                          className="rounded"
                          width={250}
                        />
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <Editor
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
                editorLoaded={editorLoaded}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className="col-12 d-flex align-items-center">
            <div className="mx-auto">
              {showButton()}
              <button
                className="btn btn-danger fw-bold"
                style={{
                  marginRight: "10px",
                }}
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="btn btn-warning fw-bold"
                type="button"
                onClick={() => navigate("/admin/list-product")}
              >
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
