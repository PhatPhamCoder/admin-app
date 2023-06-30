import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProducts,
  resetState,
  selectProduct,
} from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

import { BsPlusCircle } from "react-icons/bs";
import { ListItem } from "./ListItem";
import { AiOutlineReload } from "react-icons/ai";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useState } from "react";

const Productlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productOpt, setProductOpt] = useState(true);
  const [paginate] = useState(true);

  const productState = useSelector(selectProduct);
  const { data } = productState;

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?.slug, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetState());
  }, [dispatch]);

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
        <div className="d-flex align-items-centers justify-content-end gap-3">
          <div>
            <Typeahead
              id="search"
              onPaginate={() => console.log("Results paginated")}
              onChange={(selected) => {
                navigate(`/admin/product/${selected[0]?.prod}`);
                dispatch(getProduct(selected[0]?.prod));
              }}
              options={productOpt}
              paginate={paginate}
              labelKey={"name"}
              placeholder="Tìm kiếm sản phẩm ....."
              minLength={2}
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
      </div>
      <ListItem productData={data} />
    </div>
  );
};

export default Productlist;
