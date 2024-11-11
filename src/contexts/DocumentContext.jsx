import { createContext, useState } from "react";

export const DocumentContext = createContext();

export function DocumentProvider({ children }) {
  const [currentDocument, setCurrentDocument] = useState(null);

  const value = {
    currentDocument,
    setCurrentDocument,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}
