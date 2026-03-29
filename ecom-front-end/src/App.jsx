import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // 👈 add this
import Home from "./components/Home";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import ProductDetails from "./components/ProductDetails";
import MyOrders from "./components/Myorders";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <>
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />  
        <Route path="/orders" element={<MyOrders/>}/>

      </Routes>
      <Footer />

    </>
  );
}