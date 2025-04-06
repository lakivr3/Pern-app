"use client";
import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";

interface ThemeContextProviderProps {
    children: ReactNode;
  }
interface ThemeContextType{
    theme:String,
    setTheme:Dispatch<SetStateAction<string>>
}


export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeContextProvider:React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("theme") || "forest");
  useEffect(() => {
    // Check localStorage only on the client side
    const storedTheme = localStorage.getItem("chat-theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("chat-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
