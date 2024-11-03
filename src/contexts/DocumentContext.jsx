import { createContext, useState } from "react";

export const DocumentContext = createContext();

export function DocumentProvider({ children }) {
  const [currentDocument, setCurrentDocument] = useState("");

  return (
    <DocumentContext.Provider value={{ currentDocument, setCurrentDocument }}>
      {children}
    </DocumentContext.Provider>
  );
}
