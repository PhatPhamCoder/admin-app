import React, { useEffect } from 'react';
import { Table } from 'antd';
// import { BiEdit } from 'react-icons/bi';
// import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'title',
    },
    {
        title: 'Thông tin sản phẩm',
        dataIndex: 'desciption',
    },
    {
        title: 'Giá Bán',
        dataIndex: 'price',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
    },
    {
        title: 'Đã bán',
        dataIndex: 'sold',
    },
];
// const data = [];
// for (let i = 0; i < 46; i++) {
//     data.push({
//         key: i,
//         number: `${i}`,
//         name: `Matta Nguyễn ${i}`,
//         age: 32,
//         address: `HCMC, Tô Hiến Thành. ${i}`,
//         status: `Pending`,
//     });
// };
const Productlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    const productState = useSelector((state) => state.product.products);

    const data = [];
    for (let i = 0; i < productState.length; i++) {
        data.push({
            key: i + 1,
            title: productState[i].title,
            desciption: productState[i].description,
            price: productState[i].price,
            quantity: productState[i].quantity,
            sold: productState[i].sold,
        });
    };
    return (
        <div>
            <h3 className="mb-4 title">Danh sách sản phẩm</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Productlist