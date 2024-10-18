import { GoPlus } from "react-icons/go";
import "../styles/Sidebar.css";
import { IoMdDocument } from "react-icons/io";
import { useEffect, useState } from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import { useDocument } from "../hooks/useDocument";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar({ isOpen }) {
  const { docContent } = useDocument();
  const [showForm, setShowForm] = useState(false);
  const [docName, setDocName] = useState("");

  const [documents, setDocuments] = useState(
    localStorage.getItem("documents")
      ? JSON.parse(localStorage.getItem("documents"))
      : []
  );

  const createDocument = () => {
    const localDocuments = localStorage.getItem("documents")
      ? JSON.parse(localStorage.getItem("documents"))
      : [];
    const now = Date.now();

    const newDocument = {
      id: uuidv4(),
      name: docName + ".md",
      createdAt: now,
      content: docContent,
    };

    localDocuments.push(newDocument);
    localStorage.setItem("documents", JSON.stringify(localDocuments));

    setDocName("");
    setShowForm(false);
    setDocuments(localDocuments);
    console.log(localDocuments);
  };

  return (
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <div className="header">my documents</div>
      <button onClick={() => setShowForm(true)} className="new-document-button">
        <GoPlus size={24} />
        <span>New Document</span>
      </button>
      <div className="documents-list">
        <div className="document">
          <IoMdDocument size={24} />
          <div className="document-info">
            <span className="document-creation">15 Maggio 2024</span>
            <span className="document-name">welcome.md</span>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="new-document-form">
          <input
            type="text"
            placeholder="Nome del documento"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
          <button onClick={createDocument}>
            <HiDocumentCheck size={24} />
          </button>
        </div>
      )}
    </aside>
  );
}
