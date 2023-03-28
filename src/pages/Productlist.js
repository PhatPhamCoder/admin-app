import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetState,
  deleteAProduct,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import Currency from "react-currency-formatter";
import CustomModal from "../components/CustomModal";

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
    title: "Hình ảnh",
    dataIndex: "images",
  },
  {
    title: "Giá Bán",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
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
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data = [];
  for (let i = 0; i < productState.length; i++) {
    const id = productState[i]._id;
    data.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      price: (
        <Currency
          quantity={productState[i].price}
          currency="VND"
          locale="vi_VN"
          pattern="##,### !"
          decimal=","
          group="."
        />
      ),
      quantity: productState[i].quantity,
      sold: productState[i].sold,
      action: (
        <>
          <Link to="/" className="fs-5">
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(id)}
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
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Bạn có chắc mà muốn xóa sản phẩm này!"
      />
    </div>
  );
};

export default Productlist;
