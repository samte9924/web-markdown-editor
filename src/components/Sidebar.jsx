import { GoPlus } from "react-icons/go";
import { IoMdDocument } from "react-icons/io";
import { useState } from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import "../styles/Sidebar.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDocument,
  deleteDocument,
  getDocuments,
} from "../utils/document";
import { MdDeleteForever } from "react-icons/md";
import { IoHomeOutline, IoMenuOutline } from "react-icons/io5";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { documentId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [docName, setDocName] = useState("");

  const [currentTab, setCurrentTab] = useState("");

  const navigate = useNavigate();

  const [documents, setDocuments] = useState(getDocuments());

  const handleSubmit = () => {
    const result = createDocument(docName);
    setDocName("");
    setShowForm(false);
    setDocuments([...documents, result]);
  };

  const handleDelete = (e, selectedDocId) => {
    e.stopPropagation();

    if (documentId) {
      navigate("/");
    }

    const updatedDocs = deleteDocument(selectedDocId);
    setDocuments(updatedDocs);
  };

  return (
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <div className="tabs-list">
        <button
          onClick={() => {
            setIsOpen(false);
            setCurrentTab("");
            navigate("/");
          }}
          title="Home"
        >
          <IoHomeOutline size={24} />
        </button>
        <button
          onClick={() => {
            if (currentTab !== "myDocs") {
              setCurrentTab("myDocs");
              setIsOpen(true);
            } else if (!isOpen) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
          title="Documenti"
          className={`${currentTab === "myDocs" ? "selected" : ""}`}
        >
          <IoMenuOutline size={24} />
        </button>
      </div>
      <div className="selected-tab">
        {currentTab === "myDocs" && (
          <>
            <div className="header">my documents</div>
            <button
              onClick={() => setShowForm(true)}
              className="new-document-button"
            >
              <GoPlus size={24} />
              <span>Documento</span>
            </button>

            <div className="documents-list">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`document ${
                    doc.id === documentId ? "selected" : ""
                  }`}
                  onClick={() => navigate(`/doc/${doc.id}`)}
                >
                  <div className="document-info">
                    <IoMdDocument size={24} />
                    <span className="document-name">{doc.name}</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, doc.id)}
                    className="delete-button"
                  >
                    <MdDeleteForever size={24} />
                  </button>
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
          </>
        )}
      </div>
    </aside>
  );
}
