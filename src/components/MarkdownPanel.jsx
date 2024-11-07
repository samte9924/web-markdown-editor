import "../styles/MarkdownPanel.css";

export default function MarkdownPanel({ userInput, onChange, isCollapsed }) {
  return (
    <div className={`markdown-panel ${isCollapsed ? "collapsed" : ""}`}>
      <div className="panel-header">
        <span>Editor</span>
      </div>
      <textarea
        spellCheck={false}
        value={userInput}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
