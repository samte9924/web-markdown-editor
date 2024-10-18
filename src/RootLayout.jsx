import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const changeSidebarStatus = () => {
    setIsSidebarOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="root-layout">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="outlet-wrapper">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          changeSidebarStatus={changeSidebarStatus}
        />
        <Outlet />
      </div>
    </div>
  );
}
