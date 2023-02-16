import React, { useEffect } from 'react';
import { Table } from 'antd';
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'mobile',
    },
    {
        title: 'Nội dung',
        dataIndex: 'comment',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'date',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
        title: 'Chức năng',
        dataIndex: 'action',
    },
];


const Enquiries = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquiries());
    }, []);
    const enquiryState = useSelector((state) => state.enquiry.enquiries);

    const data = [];
    for (let i = 0; i < enquiryState.length; i++) {
        const name = enquiryState[i].name;
        const email = enquiryState[i].email;
        const mobile = enquiryState[i].mobile;
        const comment = enquiryState[i].comment;
        const date = enquiryState[i].createdAt;

        data.push({
            key: i + 1,
            name: name,
            email: email,
            mobile: mobile,
            comment: comment,
            date: date,
            status: (
                <>
                    <select name='' id='' className='form-control form-select'>
                        <option value="">Set Status</option>
                    </select>
                </>
            ),
            action: (
                <>
                    <Link to='/' className='fs-5 ms-3'><AiFillDelete /></Link>
                </>
            )
        });
    };
    return (
        <div>
            <h3 className="mb-4 title">Danh sách gửi liên hệ</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Enquiries