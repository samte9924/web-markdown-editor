import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}
