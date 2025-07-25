import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext.jsx";
import "./Header.css"

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <>
            <header className="app-header">
                <Link to="/web-color-2/" className="logo-link" aria-label="Web Color Tools Home">
                    <svg width="64" height="64" viewBox="0 0 64 64" aria-labelledby="wct-logo-title" role="img" xmlns="http://www.w3.org/2000/svg">
                        <title id="wct-logo-title">Web Color Tools Minimalist Logo</title>
                        <circle cx="24" cy="32" r="15" fill="#FF8DA1"/>
                        <circle cx="32" cy="54" r="15" fill="#9C9CEA"/>
                        <circle cx="40" cy="10" r="15" fill="#FFD966"/>
                    </svg>
                    Web Color Tools
                </Link>
                {/* Theme selector */}
                <div className="theme-select-container">
                    <label htmlFor="theme-select">THEME</label>
                    <select
                        className="theme-select"
                        id="theme-select"
                        name="theme-select"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="">Dark</option>
                        <option value="theme-light">Light</option>
                        <option value="theme-blue">Blue</option>
                    </select>
                </div>
                <nav className="app-nav">
                    <button
                        className={`hamburger ${menuIsOpen ? "open" : ""}`}
                        aria-label="Toggle navigation"
                        onClick={() => setMenuIsOpen((open) => !open)}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                    <ul className={`nav-list ${menuIsOpen ? "open" : ""}`}>
                        <li>
                            <NavLink
                                to={"/web-color-2/random-color"}
                                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
                                Random Color
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/web-color-2/color-palettes"}
                                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
                                Color Palettes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/web-color-2/gradient-creator"}
                                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
                                Gradient Creator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/web-color-2/contrast-checker"}
                                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
                                Contrast Checker
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;