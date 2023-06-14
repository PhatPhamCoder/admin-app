import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import { selectProduct } from "../../features/product/productSlice";
import { format } from "date-fns";
export const FlashSale = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector(selectProduct);
  const { data } = productState;

  return (
    <div className="container">
      <h2 className="text-center">Chương trình Flash Sale</h2>
      <div className="row">
        <div className="col-12 col-md-6">
          <label className="fs-4">Nhập tên chương trình</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tên chương trình"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="fs-4">Cài đặt Flash sale</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control w-50"
          />
        </div>
        <div className="col-12 col-md-12">
          <label className="fs-4 fw-bold text-danger">Sản phẩm sale</label>
          <table className="table">
            <thead>
              <tr className="fs-5">
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Ngày kết thúc</th>
                <th>Giá bán</th>
                <th>Giá giảm</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  .filter(
                    (data) =>
                      data?.status === "true" && data?.tags === "Flash Sale",
                  )
                  ?.map((item, index) => (
                    <tr key={index} className="fs-6">
                      <td>{index}</td>
                      <td>{item?.title}</td>
                      <td>
                        {format(new Date(item?.dateSale), "dd/MM/yyy hh:mm:ss")}
                      </td>
                      <td>
                        {item?.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>
                        {item?.discount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
