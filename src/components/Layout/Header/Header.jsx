import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css"

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    return (
        <>
            <header className="app-header">
                <Link to="/" className="logo-link" aria-label="Web Color Tools Home">
                    <svg width="64" height="64" viewBox="0 0 64 64" aria-labelledby="wct-logo-title" role="img" xmlns="http://www.w3.org/2000/svg">
                        <title id="wct-logo-title">Web Color Tools Minimalist Logo</title>
                        <circle cx="24" cy="32" r="15" fill="#FF8DA1"/>
                        <circle cx="32" cy="54" r="15" fill="#9C9CEA"/>
                        <circle cx="40" cy="10" r="15" fill="#FFD966"/>
                    </svg>
                    Web Color Tools
                </Link>
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
                                to={"/random-color"}
                                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
                                Random Color
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/color-palettes"}
                                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
                                Color Palettes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/gradient-creator"}
                                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
                                Gradient Creator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/contrast-checker"}
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