import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/cutomers/customerSlice';

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
];

// const data = [];
// for (let i = 0; i < 40; i++) {
//     data.push({
//         key: i + 1,
//         name: "customerState[i].firstname + customerState[i].lastname",
//         email: "customerState[i].email",
//         mobile: "customerState[i].mobile",
//     });
// }

const Customers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    const customerState = useSelector((state) => state.customer.customers);

    const data = [];
    for (let i = 0; i < customerState.length; i++) {
        data.push({
            key: i + 1,
            name: customerState[i].firstname + customerState[i].lastname,
            email: customerState[i].email,
            mobile: customerState[i].mobile,
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Khách hàng</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Customers;