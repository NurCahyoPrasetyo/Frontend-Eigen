import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/styles/index.css";
import Pages from "./presentation/routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  </StrictMode>
);
