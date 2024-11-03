import { IoClose, IoMenuOutline } from "react-icons/io5";
import "../styles/Navbar.css";
import { useParams } from "react-router-dom";
import { getDocumentById } from "../utils/document";
import { useEffect, useState } from "react";

export default function Navbar({ isSidebarOpen, changeSidebarStatus }) {
  const { documentId } = useParams();
  const [docName, setDocName] = useState("");

  useEffect(() => {
    setDocName(getDocumentById(documentId).name);
  }, [documentId]);

  return (
    <nav className="navbar">
      <button onClick={changeSidebarStatus} className="sidebar-status-button">
        {isSidebarOpen ? <IoClose size={32} /> : <IoMenuOutline size={32} />}
      </button>
      <span className="current-document-name">{docName || "MDfier"}</span>
    </nav>
  );
}
