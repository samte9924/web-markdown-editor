import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./RootLayout";
import "./styles/index.css";
import { DocumentProvider } from "./contexts/DocumentContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:documentId", element: <div>Document</div> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <DocumentProvider>
    <RouterProvider router={router} />
  </DocumentProvider>
);
