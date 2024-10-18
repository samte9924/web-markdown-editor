import { GoPlus } from "react-icons/go";
import "../styles/Sidebar.css";
import { IoMdDocument } from "react-icons/io";

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <div className="header">my documents</div>
      <button className="new-document-button">
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
    </aside>
  );
}
