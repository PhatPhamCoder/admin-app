import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login/Login";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Feedback/Enquiries";
import Bloglist from "./pages/Blog/Bloglist";
import Blogcatlist from "./pages/BlogCategory/Blogcatlist";
import Orders from "./pages/Order/Orders";
import Customer from "./pages/Customer/Customer";
import Categorylist from "./pages/ProductCategory/Categorylist";
import Brandlist from "./pages/Brand/Brandlist";
import Couponlist from "./pages/Coupon/Couponlist";
import Productlist from "./pages/Product/Productlist";
import Addblog from "./pages/Blog/Addblog";
import Addblogcat from "./pages/BlogCategory/Addblogcat";
import Addcat from "./pages/ProductCategory/addcat";
import Addbrand from "./pages/Brand/Addbrand";
import Addproduct from "./pages/Product/Addproduct";
import Addcoupon from "./pages/Coupon/Addcoupon";
import ViewEng from "./pages/Feedback/ViewEng";
import ViewOrder from "./pages/Order/ViewOrder";
import Social from "./pages/Setting/Social/Social";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import EmailMarketing from "./pages/Email/EmailMarketing";
import { FlashSale } from "./pages/FlashSale/flashSale";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEng />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<Addcoupon />} />
          <Route path="coupon/:id" element={<Addcoupon />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customer />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:slug" element={<Addproduct />} />
          <Route path="flash-sale" element={<FlashSale />} />
          <Route path="email" element={<EmailMarketing />} />
          <Route path="social" element={<Social />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
