import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { UserProvider } from "./context/UserContext.jsx";   // ⬅️ مهم
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LanguageProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LanguageProvider>
  </BrowserRouter>
);
