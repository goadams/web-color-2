import React from "react";
import Layout from "../components/Layout.jsx";
import "./Home.css"
import {Link, NavLink} from "react-router-dom";

const Home = () => {
    return (
        <>
            <Layout header={false}>
                <Link to="/" className="logo-link logo-link-home" aria-label="Web Color Tools Home">
                    <svg width="64" height="64" viewBox="0 0 64 64" aria-labelledby="wct-logo-title" role="img" xmlns="http://www.w3.org/2000/svg">
                        <title id="wct-logo-title">Web Color Tools Minimalist Logo</title>
                        <circle cx="24" cy="32" r="15" fill="#FF8DA1"/>
                        <circle cx="32" cy="54" r="15" fill="#9C9CEA"/>
                        <circle cx="40" cy="10" r="15" fill="#FFD966"/>
                    </svg>
                    Web Color Tools
                </Link>
                <h1>Home Page</h1>
                <div className="intro-text">
                    <p>Welcome to Web Color Tools, your one-stop website for color reference.</p>
                    <p>Choose a tool below:</p>
                </div>
                <nav className="app-nav-home">
                    <ul className="nav-list-home">
                        <li>
                            <NavLink
                                to={"/random"}
                                className="nav-button-home">
                                Random Color
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/palettes"}
                                className="nav-button-home">
                                Color Palette
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/gradients"}
                                className="nav-button-home">
                                Gradient
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/accessibility"}
                                className="nav-button-home">
                                Accessibility
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </Layout>
        </>
    );
};

export default Home;