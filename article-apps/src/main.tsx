import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { NewsListPage } from "./presentation/pages/NewsListPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NewsListPage />
  </StrictMode>
);
