import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext({
    theme: '',
    setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('theme', '');

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('theme-light', 'theme-blue');
        if (theme) root.classList.add(theme);
    }, [ theme ]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);