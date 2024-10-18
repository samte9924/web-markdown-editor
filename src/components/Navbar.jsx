import { IoClose, IoMenuOutline } from "react-icons/io5";
import "../styles/Navbar.css";

export default function Navbar({ isSidebarOpen, changeSidebarStatus }) {
  return (
    <nav className="navbar">
      <button onClick={changeSidebarStatus} className="sidebar-status-button">
        {isSidebarOpen ? <IoClose size={32} /> : <IoMenuOutline size={32} />}
      </button>
      <span className="app-name">WMD</span>
    </nav>
  );
}
