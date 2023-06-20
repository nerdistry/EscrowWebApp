import React from "react";
import Header from "../Header/Header";
import Routers from "../../Routers/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
    </>
  );
};

export default Layout;
