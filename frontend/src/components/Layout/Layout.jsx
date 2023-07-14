import React from "react";
import Header from "../Header/Header";
import Routers from "../../Routers/Routers";
import AdminHeader from "../admin-components/AdminHeader";
import Sidebar from "../admin-components/Sidebar";
import AdminRouters from "../../Routers/AdminRouters";

import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/vendor") ? (
        <>
          <AdminHeader />
          <Sidebar />
          <div>
            <AdminRouters />
          </div>
        </>
      ) : (
        <>
          <Header />
          <div>
            <Routers />
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
