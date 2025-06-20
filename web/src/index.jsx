import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

async function setupMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

setupMocking().then(() => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
