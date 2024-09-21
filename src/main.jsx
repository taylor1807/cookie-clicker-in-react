import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Styles/ClickableCookie.css";
import "./Styles/CookieCounter.css";
import "./Styles/Options.css";
import "./Styles/Upgrades.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
