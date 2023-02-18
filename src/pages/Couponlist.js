import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getCoupons } from '../features/coupon/couponSlice';
import { NumericFormat } from 'react-number-format';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Tên mã ưu đãi',
        dataIndex: 'name',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'date',
    },
    {
        title: 'Ngày hết hạn',
        dataIndex: 'expire',
    },
    {
        title: 'Mức giảm',
        dataIndex: 'discount',
    },
    {
        title: 'Chức năng',
        dataIndex: 'action',
    },
];

const Couponlist = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoupons());
    }, []);
    const couponState = useSelector((state) => state.coupon.coupons);
    const data = [];
    for (let i = 0; i < couponState.length; i++) {
        const date = format(new Date(couponState[i].createdAt), 'dd-MM-yyy');
        const expire = format(new Date(couponState[i].expiry), 'dd-MM-yyy');
        const name = couponState[i].name;
        data.push({
            key: i + 1,
            name: name,
            expire: expire,
            date: date,
            discount: (
                <NumericFormat
                    value={couponState[i].discount}
                    allowedDecimalSeparators={['%']}
                />
            ),
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
            <h3 className="mb-4 title">Danh sách mã ưu đãi</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Couponlist;