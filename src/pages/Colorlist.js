import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
const columns = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
    },
    {
        title: 'Tên màu',
        dataIndex: 'name',
    },
    {
        title: 'Mã màu',
        dataIndex: 'codecolor',
    },
    {
        title: 'Chức năng',
        dataIndex: 'action',
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
const Colorlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
    }, []);
    const colorState = useSelector((state) => state.color.colors);


    const data = [];
    for (let i = 0; i < colorState.length; i++) {
        const name = colorState[i].title;
        data.push({
            key: i + 1,
            name: name,
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
            <h3 className="mb-4 title">Màu sắc</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Colorlist