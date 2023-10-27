import React from "react";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Components/pages/Home";
import Cart from "./Components/pages/Cart";
import Category from "./Components/pages/Category";
import Register from "./Components/pages/Register";
import Login from "./Components/pages/Login";
import toast, { Toaster } from "react-hot-toast";
import Dashboard from "./Components/user/Dashboard";
import { PrivateRoute } from "./Components/Routes/Private";
import { AdminRoutes } from "./Components/Routes/AdminRoutes";
import Admindashboard from "./Components/Admin/Admindashboard";
import CreateCategory from "./Components/Admin/CreateCategory";
import CreateProduct from "./Components/Admin/CreateProduct";
import Users from "./Components/Admin/Users";
import Profile from "./Components/user/Profile";
import Order from "./Components/user/Order";
import Products from "./Components/Admin/Products";
import SearchResult from "./Components/pages/SearchResult";
import ProductDetails from "./Components/pages/ProductDetails";
import AllCategory from "./Components/pages/AllCategory";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="search" element={<SearchResult />} />
            <Route path="productDetails/:id" element={<ProductDetails />} />
            <Route path="categories" element={<AllCategory />} />

            <Route path="dashboard" element={<PrivateRoute />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/order" element={<Order />} />
            </Route>

            <Route path="/dashboard" element={<AdminRoutes />}>
              <Route path="admin" element={<Admindashboard />} />
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/users" element={<Users />} />
            </Route>

            <Route path="category" element={<Category />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
