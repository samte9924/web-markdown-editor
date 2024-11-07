import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const changeSidebarStatus = () => {
    setIsSidebarOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="root-layout">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="outlet-wrapper">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="collapse-button"
        >
          {isSidebarOpen ? (
            <IoIosArrowBack size={24} />
          ) : (
            <IoIosArrowForward size={24} />
          )}
        </button>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          changeSidebarStatus={changeSidebarStatus}
        />
        <Outlet />
      </div>
    </div>
  );
}
