import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetState,
  deleteAProduct,
  selectProduct,
} from "../../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import { BsPlusCircle } from "react-icons/bs";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Danh mục sản phẩm",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Giá Bán",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Giá Khuyến mãi",
    dataIndex: "priceDiscount",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
  },
  {
    title: "Đã bán",
    dataIndex: "sold",
  },
  {
    title: "Chức năng",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [productSlug, setProductSlug] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductSlug(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetState());
  }, []);

  const productState = useSelector(selectProduct);
  const { products } = productState;
  const data = [];
  for (let i = 0; i < products?.length; i++) {
    const slug = products[i].slug;
    data.push({
      key: i + 1,
      slug: slug,
      title: products[i].title,
      category: products[i].category,
      price: products[i].price.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      }),
      priceDiscount: products[i].discount.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      }),
      quantity: products[i].quantity,
      sold: products[i].sold,
      action: (
        <>
          <Link to={`/admin/product/${slug}`} className="fs-5">
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(slug)}
            className="fs-5 ms-3 bg-transparent border-0 text-danger"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    dispatch(getProducts());
    window.location.reload();
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <h3 className="title">Danh sách sản phẩm</h3>
        <BsPlusCircle
          size={30}
          onClick={() => navigate("/admin/product")}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
          }}
        />
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productSlug);
        }}
        title="Bạn có chắc mà muốn xóa sản phẩm này!"
      />
    </div>
  );
};

export default Productlist;
