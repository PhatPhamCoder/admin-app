// import { React, useEffect, useState } from "react";
// import { Table } from "antd";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteAColor,
//   getColors,
//   resetState,
// } from "../features/color/colorSlice";
// import { Link } from "react-router-dom";
// import CustomModal from "../components/CustomModal";

// const columns = [
//   {
//     title: "Số thứ tự",
//     dataIndex: "key",
//   },
//   {
//     title: "Mã màu",
//     dataIndex: "name",
//   },
//   {
//     title: "Chức năng",
//     dataIndex: "action",
//   },
// ];

// const Colorlist = () => {
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [colorId, setcolorId] = useState("");
//   const showModal = (e) => {
//     setOpen(true);
//     setcolorId(e);
//   };
//   const hideModal = () => {
//     setOpen(false);
//   };
//   useEffect(() => {
//     dispatch(resetState());
//     dispatch(getColors());
//   }, []);
//   const colorState = useSelector((state) => state.color.colors);

//   const data = [];
//   for (let i = 0; i < colorState.length; i++) {
//     const name = colorState[i].title;
//     const id = colorState[i]._id;
//     data.push({
//       key: i + 1,
//       name: name,
//       action: (
//         <>
//           <Link to={`/admin/color/${id}`} className="fs-5">
//             <BiEdit />
//           </Link>
//           <button
//             onClick={() => showModal(id)}
//             className="fs-5 ms-3 bg-transparent border-0 text-danger"
//           >
//             <AiFillDelete />
//           </button>
//         </>
//       ),
//     });
//   }

//   const deletecolor = (e) => {
//     dispatch(deleteAColor(e));
//     setOpen(false);
//     setTimeout(() => {
//       dispatch(getColors());
//     }, 100);
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">Màu sắc</h3>
//       <div>
//         <Table columns={columns} dataSource={data} />
//       </div>
//       <CustomModal
//         hideModal={hideModal}
//         open={open}
//         performAction={() => {
//           deletecolor(colorId);
//         }}
//         title="Bạn có chắc mà muốn xóa màu này!"
//       />
//     </div>
//   );
// };

// export default Colorlist;
