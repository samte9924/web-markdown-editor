import { useState } from "react";
import PreviewPanel from "../components/PreviewPanel";
import MarkdownPanel from "../components/MarkdownPanel";
import "../styles/Home.css";
import { useDocument } from "../hooks/useDocument";

export default function Home() {
  const { setDocContent } = useDocument();
  const [userInput, setUserInput] = useState("");

  const handleChange = (value) => {
    setDocContent(value);
    setUserInput(value);
  };

  return (
    <div className="editor-wrapper">
      <MarkdownPanel userInput={userInput} onChange={handleChange} />
      <PreviewPanel userInput={userInput} />
    </div>
  );
}
