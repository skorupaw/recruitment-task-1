import React from "react";
import ReactDOM from "react-dom/client";
import "@/global.css";
import Root from "@/Root.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
