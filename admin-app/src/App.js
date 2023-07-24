import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";



// import MainLayout from './components/MainLayout';
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import ProductList from "./pages/ProductList";
import BrandList from "./pages/BrandList";
import CategoryList from "./pages/CategoryList";
import ColorList from "./pages/ColorList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import AddColor from "./pages/AddColor";
import AddProductCat from "./pages/AddProductCat";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />

          <Route path="product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="category" element={<AddProductCat />} />
          <Route path="category/:id" element={<AddProductCat />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
