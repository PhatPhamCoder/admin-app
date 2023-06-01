import React, { useEffect, useState } from "react";
import { Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteAProduct,
  getProducts,
  updateStatus,
} from "../../features/product/productSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Discount",
    dataIndex: "priceDiscount",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Flash Sale",
    dataIndex: "sale",
  },
  {
    title: "Sold",
    dataIndex: "sold",
  },
  {
    title: "Chức năng",
    dataIndex: "action",
  },
];
export const ListItem = ({ productData = [] }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productSlug, setProductSlug] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductSlug(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleStatus = (e, id, i) => {
    const active = e.target.checked;
    dispatch(updateStatus({ id, active }));
    // console.log(productData);
    // console.log(id);
    // const checkIndex = productData.findIndex((arrow) => arrow.i);
    // console.log(checkIndex);
  };

  const handleFlashSale = (e, id) => {
    const active = e.target.checked;
  };

  let dataColumn = [];
  for (let i = 0; i < productData?.length; i++) {
    dataColumn.push({
      key: i + 1,
      slug: productData[i].slug,
      title: productData[i].title,
      category: productData[i].category,
      price: productData[i].price.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      }),
      priceDiscount: productData[i].discount.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      }),
      quantity: productData[i].quantity,
      status: (
        <>
          <input
            type="checkbox"
            checked={productData[i].status === "true"}
            className="text-center p-2 ms-3"
            onChange={(e) => handleStatus(e, productData[i]._id, i)}
          />
        </>
      ),
      sale: (
        <>
          <input
            type="checkbox"
            checked={productData[i].flashSale}
            className="text-center p-2 ms-4"
            onChange={(e) => handleFlashSale(e, productData[i]._id)}
          />
        </>
      ),
      sold: productData[i].sold,
      action: (
        <>
          <Link to={`/admin/product/${productData[i].slug}`} className="fs-5">
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(productData[i].slug)}
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
    <>
      <div>
        <Table columns={columns} dataSource={dataColumn} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productSlug);
        }}
        title="Bạn có chắc mà muốn xóa sản phẩm này!"
      />
    </>
  );
};
