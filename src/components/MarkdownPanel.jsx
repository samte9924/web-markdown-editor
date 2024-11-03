import "../styles/MarkdownPanel.css";

export default function MarkdownPanel({ userInput, onChange }) {
  return (
    <textarea
      spellCheck={false}
      value={userInput}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
}
