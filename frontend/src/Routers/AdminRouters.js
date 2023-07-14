import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "../admin/Admin";
import Vendor from "../admin/Vendor";
import ViewUsers from "../admin/ViewUsers";
import VendorApplications from "../admin/VendorApplications";
import ViewProducts from "../admin/ViewProducts";
import ViewVendors from "../admin/ViewVendors";
import AddCategory from "../admin/AddCategory";
import AddProduct from "../admin/AddProduct";
import ViewStats from "../admin/ViewStats";
import ViewTransactions from "../admin/ViewTransactions";
import VendorOrders from "../admin/VendorOrders";
import VendorTransactions from "../admin/VendorTransactions";
import UpdateProduct from "../admin/UpdateProduct";
import AdminProfile from "../admin/AdminProfile";

const AdminRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="admin" />} />
      <Route path="admin" element={<Admin />} />
      <Route path="admin/view-users" element={<ViewUsers />} />
      <Route path="admin/vendor-application" element={<VendorApplications />} />
      <Route path="admin/view-vendors" element={<ViewVendors />} />
      <Route path="admin/view-products" element={<ViewProducts />} />
      <Route path="admin/view-transactions" element={<ViewTransactions />} />
      <Route path="admin/view-stats" element={<ViewStats />} />
      <Route path='admin/update-product/:id' element={<UpdateProduct />} />
      <Route path="admin/add-category" element={<AddCategory />} />
      <Route path='admin/profile' element={<AdminProfile />} />

      <Route path="vendor" element={<Vendor />} />
      <Route path="vendor/add-category" element={<AddCategory />} />
      <Route path="vendor/add-product" element={<AddProduct />} />
      <Route path="vendor/view-products" element={<ViewProducts />} />
      <Route path="admin/view-vendors" element={<ViewVendors />} />
      <Route path="vendor/view-orders" element={<VendorOrders />} />
      <Route path="vendor/view-transactions" element={<VendorTransactions />} />
      <Route path="vendor/view-products" element={<ViewProducts />} />
      <Route path='vendor/update-product/:id' element={<UpdateProduct />} />
      <Route path='vendor/profile' element={<AdminProfile />} />

    </Routes>
  );
};

export default AdminRouters;
