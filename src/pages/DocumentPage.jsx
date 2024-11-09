import { useParams } from "react-router-dom";
import MarkdownPanel from "../components/MarkdownPanel";
import PreviewPanel from "../components/PreviewPanel";
import { useEffect, useRef, useState } from "react";
import { getDocumentById, updateDocument } from "../utils/document";
import { IoIosSave } from "react-icons/io";
import "../styles/DocumentPage.css";

export default function DocumentPage() {
  const { documentId } = useParams();
  const [savedContent, setSavedContent] = useState(
    getDocumentById(documentId).content
  );
  const [userInput, setUserInput] = useState(
    getDocumentById(documentId).content
  );
  const [showSaveButton, setShowSaveButton] = useState(false);

  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);

  const timeoutRef = useRef(null);
  const saveButtonRef = useRef(null);

  useEffect(() => {
    setUserInput(getDocumentById(documentId).content);
  }, [documentId]);

  const handleChange = (value) => {
    setUserInput(value);

    if (userInput !== savedContent && !showSaveButton) {
      setShowSaveButton(true);
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          saveButtonRef.current.classList.toggle("bounce-in-up");
          timeoutRef.current = null;
        }, 400);
      }
    } else if (userInput === savedContent && showSaveButton) {
      saveButtonRef.current.classList.toggle("bounce-out-down");
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          saveButtonRef.current.classList.toggle("bounce-out-down");
          setShowSaveButton(false);
          timeoutRef.current = null;
        }, 400);
      }
    }
  };

  const handleSave = () => {
    updateDocument(documentId, { content: userInput });
    saveButtonRef.current.classList.toggle("bounce-out-down");
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        saveButtonRef.current.classList.toggle("bounce-out-down");
        setShowSaveButton(false);
        timeoutRef.current = null;
      }, 400);
    }
    setSavedContent(userInput);
  };

  return (
    <div className="editor-wrapper">
      <MarkdownPanel
        userInput={userInput}
        onChange={handleChange}
        isCollapsed={isEditorCollapsed}
      />
      <PreviewPanel userInput={userInput} toggleEditor={setIsEditorCollapsed} />
      {showSaveButton && (
        <button
          ref={saveButtonRef}
          onClick={handleSave}
          className="save-button bounce-in-up"
        >
          <IoIosSave size={24} />
          <span>Salva</span>
        </button>
      )}
    </div>
  );
}
