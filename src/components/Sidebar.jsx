import { GoPlus } from "react-icons/go";
import { IoMdDocument } from "react-icons/io";
import { useEffect, useState } from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import "../styles/Sidebar.css";
import { useNavigate, useParams } from "react-router-dom";
import { createDocument, getDocuments } from "../utils/document";

export default function Sidebar({ isOpen }) {
  const { documentId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [docName, setDocName] = useState("");

  const navigate = useNavigate();

  const [documents, setDocuments] = useState(getDocuments());

  const handleSubmit = () => {
    const result = createDocument(docName);
    setDocName("");
    setShowForm(false);
    setDocuments([...documents, result]);
    console.log(documents);
  };

  return (
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <div className="header">my documents</div>
      <button onClick={() => setShowForm(true)} className="new-document-button">
        <GoPlus size={24} />
        <span>New Document</span>
      </button>
      <div className="documents-list">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`document ${doc.id === documentId ? "selected" : ""}`}
            onClick={() => navigate(`/${doc.id}`)}
          >
            <IoMdDocument size={24} />
            <div className="document-info">
              <span className="document-name">{doc.name}</span>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="new-document-form">
          <input
            type="text"
            placeholder="Nome del documento"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
          <button onClick={handleSubmit}>
            <HiDocumentCheck size={24} />
          </button>
        </div>
      )}
    </aside>
  );
}
