import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../views/Home";
import Cart from "../views/Cart";
import Category from "../views/Category";
import Checkout from "../views/Checkout";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ProductDetails from "../views/ProductDetails";
import Profile from "../views/Profile";
import ProtectedRoute from "./ProtectedRoute";

/******ADDED********/

import ResetPassword from "../views/ResetPassword";

import PhoneLogIn from "../views/PhoneLogIn";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="profile" element={<Profile />} />
      <Route path="products" element={<Category />} />
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

      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="phonesignin" element={<PhoneLogIn />} />
      <Route path="resetpassword" element={<ResetPassword />} />

    </Routes>
  );
};

export default Routers;
