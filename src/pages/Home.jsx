import { useState } from "react";
import PreviewPanel from "../components/PreviewPanel";
import MarkdownPanel from "../components/MarkdownPanel";
import "../styles/Home.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");

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
