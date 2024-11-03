import { useParams } from "react-router-dom";
import MarkdownPanel from "../components/MarkdownPanel";
import PreviewPanel from "../components/PreviewPanel";
import { useEffect, useState } from "react";
import { getDocumentById } from "../utils/document";

export default function DocumentPage() {
  const { documentId } = useParams();
  const [userInput, setUserInput] = useState(
    getDocumentById(documentId).content
  );

  useEffect(() => {
    setUserInput(getDocumentById(documentId).content);
  }, [documentId]);

  const handleChange = (value) => {
    setUserInput(value);
  };

  return (
    <div className="editor-wrapper">
      <MarkdownPanel userInput={userInput} onChange={handleChange} />
      <PreviewPanel userInput={userInput} />
    </div>
  );
}
