import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetState,
  selectProduct,
} from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

import { BsPlusCircle } from "react-icons/bs";
import { ListItem } from "./ListItem";
import { AiOutlineReload } from "react-icons/ai";

const Productlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetState());
  }, [dispatch]);

  const productState = useSelector(selectProduct);
  const { data } = productState;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2 mb-0">
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
        <div
          className="p-1 rounded bg-primary fw-bold"
          style={{ cursor: "pointer", border: "2px solid" }}
        >
          <AiOutlineReload
            size={30}
            onClick={() => window.location.reload()}
            color="#fff"
          />
        </div>
      </div>
      <ListItem productData={data} />
    </div>
  );
};

export default Productlist;
