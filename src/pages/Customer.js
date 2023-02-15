import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i + 1,
        name: `Matta Nguyễn ${i}`,
        email: "matta@gmail.com",
        mobile: "0777077293",
    });
};
const Customer = () => {
    return (
        <div>
            <h3 className="mb-4 title">Khách hàng</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Customer