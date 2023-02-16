import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';

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
        title: 'Status',
        dataIndex: 'status',
    },
];
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//     data1.push({
//         key: i,
//         number: `${i}`,
//         name: `Matta Nguyễn ${i}`,
//         age: 32,
//         address: `HCMC, Tô Hiến Thành. ${i}`,
//         status: `Pending`,
//     });
// };
const Brandlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, []);
    const brandState = useSelector((state) => state.brand.brands);

    const data = [];
    for (let i = 0; i < brandState.length; i++) {
        data.push({
            key: i + 1,
            name: brandState[i].title,
            date: brandState[i].createdAt,
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

export default Brandlist;