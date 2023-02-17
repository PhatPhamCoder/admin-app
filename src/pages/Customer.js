import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';
import { format } from 'date-fns';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'date',
    },
];

const Customers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    const customerState = useSelector((state) => state.customer.customers);
    const data = [];
    for (let i = 0; i < customerState.length; i++) {
        const date = format(new Date(customerState[i].createdAt), 'dd-MM-yyy');
        data.push({
            key: i + 1,
            name: customerState[i].firstname,
            email: customerState[i].email,
            mobile: customerState[i].mobile,
            date: date
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Danh sách khách hàng</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Customers;