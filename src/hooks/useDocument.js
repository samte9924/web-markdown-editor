import { useContext } from "react";
import { DocumentContext } from "../contexts/DocumentContext";

export const useDocument = () => useContext(DocumentContext);
