import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {

  return (
    <div className="h-[50%] flex flex-row justify-start">
      <Sidebar />
      <div className="bg-sky-600 flex-1 p-4 text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;
