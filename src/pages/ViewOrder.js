import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getOrderByUser } from '../features/auth/authSlice';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
    },
    {
        title: 'Số lượng sản phẩm',
        dataIndex: 'count',
    },
    {
        title: 'Giá bán',
        dataIndex: 'amount',
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color',
    },
    {
        title: 'Ngày đặt hàng',
        dataIndex: 'date',
    },
    {
        title: 'Chức năng',
        dataIndex: 'action',
    },
];

const ViewOrder = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderByUser(userId));
    }, []);
    const orderState = useSelector((state) => state.auth.orderbyuser.products);
    const data = [];
    for (let i = 0; i < orderState.length; i++) {
        data.push({
            key: i + 1,
            name: orderState[i].product.title,
            count: orderState[i].count,
            amount: orderState[i].product.price,
            color: orderState[i].product.color,
            date: new Date(orderState[i].product.createdAt).toLocaleString(),
            action: (
                <>
                    <Link to="/" className='fs-5'><BiEdit /></Link>
                    <Link to='/' className='fs-5 ms-3'><AiFillDelete /></Link>
                </>
            )
        });
    };
    return (
        <div>
            <h3 className="mb-4 title">Danh sách đơn hàng người mua</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default ViewOrder;