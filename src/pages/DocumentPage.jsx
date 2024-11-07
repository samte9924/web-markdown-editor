import { useParams } from "react-router-dom";
import MarkdownPanel from "../components/MarkdownPanel";
import PreviewPanel from "../components/PreviewPanel";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setUserInput(getDocumentById(documentId).content);
  }, [documentId]);

  const handleChange = (value) => {
    setUserInput(value);
  };

  const handleSave = () => {
    updateDocument(documentId, { content: userInput });
    setSavedContent(userInput);
  };

  return (
    <div className="editor-wrapper">
      <MarkdownPanel userInput={userInput} onChange={handleChange} />
      <PreviewPanel userInput={userInput} />
      {savedContent !== userInput && (
        <button onClick={handleSave} className="save-button bounce-in-up">
          <IoIosSave size={24} />
          <span>Salva</span>
        </button>
      )}
    </div>
  );
}
