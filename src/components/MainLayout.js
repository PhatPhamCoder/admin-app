import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { MdAlternateEmail, MdNotificationsActive } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../images/avatar.png";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const userState = useSelector((state) => state?.auth?.user);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">RAMAT</span>
            <span className="lg-logo">Ramat NoteBooks</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Khách hàng",
            },
            {
              key: "product",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Sản phẩm",
              children: [
                {
                  key: "list-product",
                  icon: <AiOutlineOrderedList className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Đơn hàng",
            },

            {
              key: "coupon-list",
              icon: <RiCouponLine className="fs-4" />,
              label: "Mã ưu đãi",
            },

            {
              key: "Blog",
              icon: <FaBloggerB className="fs-4" />,
              label: "Bài viết",
              children: [
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Danh sách gửi liên hệ",
            },
            {
              key: "email",
              icon: <MdAlternateEmail className="fs-4" />,
              label: "Nhận tin khuyến mãi",
            },
            {
              key: "signout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            },
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <MdNotificationsActive className="fs-4 fa-i-cursor" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                4
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div className="border-1 rounded-circle">
                <img
                  width={50}
                  height={50}
                  className="rounded-circle img-fluid"
                  src={logo}
                  alt=""
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">
                  {"Admin" || userState?.firstname + userState?.lastname}
                </h5>
                <p className="mb-0">{userState?.email}</p>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                >
                  <Link className="dropdown-item" to="/">
                    Thông tin tài khoản
                  </Link>
                </li>
                <li
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                >
                  <button className="dropdown-item" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Outlet />
          <p className="text-left mb-0 text-dark" style={{ bottom: 0 }}>
            &copy; {new Date().getFullYear()} Powered By Ptech
          </p>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
