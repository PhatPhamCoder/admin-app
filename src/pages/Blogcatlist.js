import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/bcategory/bcategorySlice';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Tên danh mục',
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

const Blogcatlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    const bCategoryState = useSelector((state) => state.bCategory.bCategories);

    const data = [];
    for (let i = 0; i < bCategoryState.length; i++) {
        const date = format(new Date(bCategoryState[i].createdAt), 'dd-MM-yyy');
        const name = bCategoryState[i].title;
        const desc = bCategoryState[i].description;
        const category = bCategoryState[i].category;
        data.push({
            key: i + 1,
            name: name,
            description: desc,
            category: category,
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
            <h3 className="mb-4 title">Danh mục bài viết</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
};

export default Blogcatlist;