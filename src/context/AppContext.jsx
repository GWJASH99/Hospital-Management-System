import React, { createContext, useState, useEffect } from "react";
import { translations } from "../utils/translations";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "EN");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
  };

  // Translation function
  const t = (key) => {
    const keys = key.split(".");
    let result = translations[lang] || translations["EN"];
    for (const k of keys) {
      if (result[k] === undefined) {
        // Fallback to English if key not found in current language
        let fallback = translations["EN"];
        for (const fbK of keys) {
            fallback = fallback ? fallback[fbK] : undefined;
        }
        return fallback || key;
      }
      result = result[k];
    }
    return result;
  };

  const tObj = translations[lang] || translations["EN"];

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, changeLanguage, t, tObj }}>
      {children}
    </AppContext.Provider>
  );
};
