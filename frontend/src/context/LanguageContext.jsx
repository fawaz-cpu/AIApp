// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en"); // "en" أو "ar"

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const value = { lang, toggleLang };

  return (
    <LanguageContext.Provider value={value}>
      <div className={lang === "ar" ? "font-[system-ui] rtl" : "font-[system-ui]"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
