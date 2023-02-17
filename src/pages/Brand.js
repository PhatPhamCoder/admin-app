import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Tên đối tác',
        dataIndex: 'name',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'date',
    },
    {
        title: 'Chức năng',
        dataIndex: 'action',
    },
];

const Brand = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, []);
    const brandState = useSelector((state) => state.brand.brands);

    const data = [];
    for (let i = 0; i < brandState.length; i++) {
        const date = format(new Date(brandState[i].createdAt), 'dd-MM-yyy');
        const name = brandState[i].title;
        data.push({
            key: i + 1,
            name: name,
            date: date,
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
            <h3 className="mb-4 title">Danh sách thương hiệu</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Brand;