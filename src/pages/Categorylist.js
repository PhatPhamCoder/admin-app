import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'number',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'address',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        number: `${i}`,
        name: `Matta Nguyễn ${i}`,
        age: 32,
        address: `HCMC, Tô Hiến Thành. ${i}`,
        status: `Pending`,
    });
};
const Categorylist = () => {
    return (
        <div>
            <h3 className="mb-4 title">Danh mục sản phẩm</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Categorylist;