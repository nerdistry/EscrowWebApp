import React from "react";
import Header from "../Header/Header";
import Routers from "../../Routers/Routers";
import AdminHeader from "../admin-components/AdminHeader";
import Sidebar from "../admin-components/Sidebar";
import AdminRouters from "../../Routers/AdminRouters";

const Layout = () => {
  return (
    <>
      <>
        <Header />
        <div>
          <Routers />
        </div>
      </>
      <>
        {/* <AdminHeader />
        <Sidebar />
        <div>
          <AdminRouters />
        </div> */}
      </>
    </>
  );
};

export default Layout;
