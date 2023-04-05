import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // UploadOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
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
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "paper",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Paper",
                },
                {
                  key: "list-paper",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Paper List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Đơn hàng",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupn List",
                },
              ],
            },
            {
              key: "Blog",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
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
              <div>
                <img
                  width={50}
                  height={50}
                  className="rounded-circle img-fluid"
                  src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t1.6435-9/120091017_2441839339448292_1661578394510824780_n.png?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cYWgjIvZDJUAX95bpPE&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfCzC6N58vQPTUe4mWgbKCjBh6gllJcpn1L9vXB1MSM-dA&oe=644A66B8"
                  alt=""
                />
              </div>
              <div
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Matta Nguyễn</h5>
                <p className="mb-0">ngocnhi130396@gmail.com</p>
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
                  <Link className="dropdown-item" to="/">
                    Đăng xuất
                  </Link>
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
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
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
