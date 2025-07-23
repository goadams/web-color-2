import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import "./Home.css"
import {Link, NavLink} from "react-router-dom";
import {useTheme} from "../context/ThemeContext.jsx";

const Home = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <Layout>
                <h1>Home Page</h1>
                <div className="intro-text">
                    <p>Welcome to Web Color Tools, your one-stop website for color reference.</p>
                    <p>Choose a tool below:</p>
                </div>
                <nav className="app-nav-home">
                    <ul className="nav-list-home">
                        <li>
                            <NavLink
                                to={"/random-color"}
                                className="nav-button-home">
                                Random Color
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/color-palettes"}
                                className="nav-button-home">
                                Color Palettes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/gradient-creator"}
                                className="nav-button-home">
                                Gradient Creator
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/contrast-checker"}
                                className="nav-button-home">
                                Contrast Checker
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </Layout>
        </>
    );
};

export default Home;