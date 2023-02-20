import { React, useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlogCat, getCategories, resetState } from '../features/bcategory/bcategorySlice';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import CustomModal from '../components/CustomModal';

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
    const [open, setOpen] = useState(false);
    const [blogCatId, setblogCatId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setblogCatId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(resetState());
        dispatch(getCategories());
    }, []);
    const bCategoryState = useSelector((state) => state.bCategory.bCategories);

    const data = [];
    for (let i = 0; i < bCategoryState.length; i++) {
        const date = format(new Date(bCategoryState[i].createdAt), 'dd-MM-yyy');
        const name = bCategoryState[i].title;
        const desc = bCategoryState[i].description;
        const category = bCategoryState[i].category;
        const id = bCategoryState[i]._id;
        console.log(id)
        data.push({
            key: i + 1,
            name: name,
            description: desc,
            category: category,
            date: date,
            action: (
                <>
                    <Link to={`/admin/blog-category/${id}`} className='fs-5'><BiEdit /></Link>
                    <button
                        onClick={() => showModal(id)}
                        className='fs-5 ms-3 bg-transparent border-0 text-danger'
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    };

    const deleteBlogCat = (e) => {
        dispatch(deleteABlogCat(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Danh mục bài viết</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteBlogCat(blogCatId)
                }}
                title="Bạn có chắc mà muốn xóa danh mục này!"
            />
        </div>
    )
};

export default Blogcatlist;