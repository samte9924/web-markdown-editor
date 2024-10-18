import { createContext, useState } from "react";

export const DocumentContext = createContext();

export function DocumentProvider({ children }) {
  const [docContent, setDocContent] = useState("");

  return (
    <DocumentContext.Provider value={{ docContent, setDocContent }}>
      {children}
    </DocumentContext.Provider>
  );
}
