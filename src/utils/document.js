import { v4 as uuidv4 } from "uuid";

export const createDocument = (docName) => {
  const localDocuments = getDocuments();
  const now = Date.now();

  const newDocument = {
    id: uuidv4(),
    name: docName + ".md",
    createdAt: now,
    content: "",
  };

  localDocuments.push(newDocument);
  localStorage.setItem("documents", JSON.stringify(localDocuments));

  return newDocument;
};

export const getDocuments = () => {
  return localStorage.getItem("documents")
    ? JSON.parse(localStorage.getItem("documents"))
    : [];
};

export const getDocumentById = (docId) => {
  const localDocuments = getDocuments();

  return localDocuments.filter((doc) => doc.id === docId)[0];
};

export const updateDocument = (docId, updatedData) => {
  const localDocuments = getDocuments();

  const updatedDoc = { ...getDocumentById(docId), ...updatedData };
  console.log(updatedDoc);

  const updatedDocuments = localDocuments.map((doc) =>
    doc.id === docId ? updatedDoc : doc
  );
  localStorage.setItem("documents", JSON.stringify(updatedDocuments));

  return updatedDoc;
};

export const deleteDocument = (docId) => {
  const localDocuments = getDocuments();

  const updatedDocuments = localDocuments.filter((doc) => doc.id !== docId);
  localStorage.setItem("documents", JSON.stringify(updatedDocuments));

  return updatedDocuments;
};
