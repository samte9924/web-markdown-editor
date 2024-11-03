import { useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "../styles/PreviewPanel.css";

export default function PreviewPanel({ userInput }) {
  const previewRef = useRef(null);

  useEffect(() => {
    const rawMarkup = marked.parse(userInput, { gfm: true, breaks: true });

    // Sanitize markup to prevent XSS attacks
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);

    if (previewRef.current) {
      // Safely inject markup inside the panel as html
      previewRef.current.innerHTML = cleanMarkup;
    }
  }, [userInput]);

  return <div className="preview-panel" ref={previewRef}></div>;
}
