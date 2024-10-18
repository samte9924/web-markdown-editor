import "../styles/MarkdownPanel.css";

export default function MarkdownPanel({ userInput, onChange }) {
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      // Prevent tab key from focus on a different element
      e.preventDefault();

      const { selectionStart, selectionEnd } = e.target;

      const newText =
        userInput.slice(0, selectionStart) +
        "    " +
        userInput.slice(selectionEnd);
      onChange(newText);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 4; // Posiziona il cursore dopo i nuovi spazi
      }, 0);
    }
  };

  return (
    <textarea
      spellCheck={false}
      value={userInput}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    ></textarea>
  );
}
