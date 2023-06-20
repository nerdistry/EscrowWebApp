import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../views/Home";
import Cart from "../views/Cart";
import Category from "../views/Category";
import Checkout from "../views/Checkout";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ProductDetails from "../views/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="category" element={<Category />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="category/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default Routers;
