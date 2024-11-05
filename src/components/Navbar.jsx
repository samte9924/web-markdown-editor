import { useNavigate, useParams } from "react-router-dom";
import { getDocumentById } from "../utils/document";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { IoMdCloudDownload } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar() {
  const { documentId } = useParams();
  const [docName, setDocName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (documentId) {
      setDocName(getDocumentById(documentId).name);
    } else {
      setDocName("MDfier");
    }
  }, [documentId]);

  const handleDownload = () => {
    const doc = getDocumentById(documentId);

    const blob = new Blob([doc.content], { type: "text/markdown" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <nav className="navbar">
      <div className="current-document">
        <span>{docName}</span>
        {documentId && (
          <button onClick={() => navigate("/")} title="Chiudi">
            <IoCloseOutline size={32} />
          </button>
        )}
      </div>
      {documentId && (
        <div className="document-actions">
          <button onClick={handleDownload} className="download">
            <IoMdCloudDownload size={24} />
            <span>Scarica</span>
          </button>
        </div>
      )}
    </nav>
  );
}
