import React from 'react';
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from '@ant-design/plots';
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
}

const Dashboard = () => {
    const data = [
        {
            type: 'Tháng 01',
            sales: 38,
        },
        {
            type: 'Tháng 02',
            sales: 52,
        },
        {
            type: 'Tháng 03',
            sales: 61,
        },
        {
            type: 'Tháng 04',
            sales: 145,
        },
        {
            type: 'Tháng 05',
            sales: 48,
        },
        {
            type: 'Tháng 06',
            sales: 38,
        },
        {
            type: 'Tháng 07',
            sales: 38,
        },
        {
            type: 'Tháng 08',
            sales: 60,
        },
        {
            type: 'Tháng 09',
            sales: 38,
        },
        {
            type: 'Tháng 10',
            sales: 80,
        },
        {
            type: 'Tháng 11',
            sales: 38,
        },
        {
            type: 'Tháng 12',
            sales: 20,
        },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return "#1677ff"; //color column
        },
        label: {
            position: 'middle',
            // 'top', 'bottom', 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Tháng',
            },
            sales: {
                alias: 'Doanh thu',
            },
        },
    };
    return (
        <div>
            <h3 className='mb-4 title'>Dashboard</h3>
            <div className='d-flex justify-content-between align-items-center gap-3'>
                <div className='d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Tổng cộng</p> <h4 className='mb-0 sub-title'>đ 200.00</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6><BsArrowDownRight />32%</h6>
                        <p className='mb-0 desc'>So sánh đến tháng 02/2023</p>
                    </div>
                </div>
                <div className='d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Tổng cộng</p> <h4 className='mb-0 sub-title'>đ 200.00</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className='red'>
                            <BsArrowDownRight /> 50%
                        </h6>
                        <p className='mb-0 desc'>So sánh đến tháng 02/2023</p>
                    </div>
                </div>
                <div className='d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Tổng cộng</p> <h4 className='mb-0 sub-title'>đ 200.00</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className='green'>
                            <BsArrowUpRight /> 32%
                        </h6>
                        <p className='mb-0 desc'>So sánh đến tháng 02/2023</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className='mb-5'>Phân tích doanh thu</h3>
                <div>
                    <Column {...config} />
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5">Đơn hàng mới nhất</h3>
                <div>
                    <Table columns={columns} dataSource={data1} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard