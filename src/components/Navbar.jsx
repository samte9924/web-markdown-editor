import { useNavigate, useParams } from "react-router-dom";
import { getDocumentById, updateDocument } from "../utils/document";
import { useEffect, useState } from "react";
import { IoIosSave, IoMdCloudDownload } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import "../styles/Navbar.css";
import { GoPencil } from "react-icons/go";
import { useDocument } from "../hooks/useDocument";

export default function Navbar() {
  const { documentId } = useParams();
  const { currentDocument, setCurrentDocument } = useDocument();
  const [docName, setDocName] = useState("");
  const [isEditing, setIsEditing] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setDocName(
      currentDocument ? currentDocument.name.replace(".md", "") : "MDfier"
    );
  }, [currentDocument]);

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

  const handleSaveDocName = () => {
    if (!docName) return;

    const result = updateDocument(documentId, { name: docName + ".md" });
    setDocName(result.name);
    setIsEditing(false);
  };

  return (
    <nav className="navbar">
      <div className="current-document">
        {isEditing ? (
          <>
            <input
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            ></input>
            <button
              onClick={handleSaveDocName}
              title="Salva"
              className="save-doc-name-button"
            >
              <GoPencil size={24} />
            </button>
          </>
        ) : (
          <>
            <span
              onClick={() => {
                if (documentId) {
                  setIsEditing(true);
                }
              }}
            >
              {docName}
            </span>
            {documentId && (
              <button
                onClick={() => {
                  setCurrentDocument(null);
                  navigate("/");
                }}
                title="Chiudi"
                className="close-doc-button"
              >
                <IoCloseOutline size={24} />
              </button>
            )}
          </>
        )}
      </div>
      <div className="document-actions">
        <button onClick={handleDownload} className="download">
          <IoMdCloudDownload size={24} />
          <span>Scarica</span>
        </button>
      </div>
    </nav>
  );
}
