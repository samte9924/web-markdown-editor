import { useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { BsArrowsExpandVertical } from "react-icons/bs";
import "../styles/PreviewPanel.css";

export default function PreviewPanel({ userInput, toggleEditor }) {
  const previewRef = useRef(null);

  useEffect(() => {
    marked.use({ gfm: true, breaks: true });

    // Parse input and sanitize markup to prevent XSS attacks
    const rawMarkup = marked.parse(userInput);
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);

    //console.log(cleanMarkup);

    if (previewRef.current) {
      // Safely inject markup inside the panel as html
      previewRef.current.innerHTML = cleanMarkup;
    }
  }, [userInput]);

  return (
    <div className="preview-panel">
      <div className="panel-header">
        <span>Preview</span>
        <button title="Espandi" onClick={() => toggleEditor((prev) => !prev)}>
          <BsArrowsExpandVertical size={28} />
        </button>
      </div>
      <div ref={previewRef} className="markdown-content"></div>
    </div>
  );
}
