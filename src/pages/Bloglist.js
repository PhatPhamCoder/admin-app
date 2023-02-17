import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Tiêu đề Blog',
        dataIndex: 'name',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
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

const Bloglist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs());
    }, []);
    const blogState = useSelector((state) => state.blog.blogs);

    const data = [];
    for (let i = 0; i < blogState.length; i++) {
        const date = format(new Date(blogState[i].createdAt), 'dd-MM-yyy');
        const name = blogState[i].title;
        const desc = blogState[i].description;
        const category = blogState[i].category;

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
            <h3 className="mb-4 title">Danh sách bài viết</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Bloglist