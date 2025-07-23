import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import "./Home.css"
import {Link} from "react-router-dom";
import randomColorScreenshot from '../assets/random-color-screenshot.png';
import colorPalettesScreenshot from '../assets/color-palettes-screenshot.png';
import gradientScreenshot from '../assets/gradient-screenshot.png';
import contrastChecker from '../assets/contrast-screenshot.png';

const Home = () => {
    return (
        <>
            <Layout>
                <div className="app-splash-container">
                    <h1 className="app-splash-words">Welcome to Web Color Tools</h1>
                    <div className="intro-text">
                        <p className="app-splash-words">Your home for simple color tools. Choose a tool below and get to work!</p>
                    </div>
                </div>

                <div className="app-pages-container">
                    <div className="app-page-info">
                        <div>
                            <h2>Random Color</h2>
                            <p>Get random colors. Save the ones you like. Sort them into your favorites.</p>
                            <Link
                                to={"/web-color-2/random-color"}
                                className="link-button">
                                Random Color
                            </Link>
                        </div>
                        <img src={randomColorScreenshot} alt="A screenshot of a sample Random Color saved section." />
                    </div>
                    <div className="app-page-info">
                        <img src={colorPalettesScreenshot} alt="A screenshot of a sample Color Palettes saved section."/>
                        <div>
                            <h2>Color Palettes</h2>
                            <p>Create palettes based on a base color. Save and favorite them.</p>
                            <Link
                                to={"/web-color-2/color-palettes"}
                                className="link-button">
                                Color Palettes
                            </Link>
                        </div>
                    </div>
                    <div className="app-page-info">
                        <div>
                            <h2>Gradient Creator</h2>
                            <p>Create linear, radial, and conic gradients. Copy the CSS Code to use in your project!</p>
                            <Link
                                to={"/web-color-2/gradient-creator"}
                                className="link-button">
                                Gradient Creator
                            </Link>
                        </div>
                        <img src={gradientScreenshot} alt="A screenshot of a sample Gradient Creator saved section."/>
                    </div>
                    <div className="app-page-info">
                        <img src={contrastChecker} alt="A screenshot of a sample previews section on the Contrast Checker page."/>
                        <div>
                            <h2>Contrast Checker</h2>
                            <p>Verify compliance with WCAG 2.1 AA and AAA standards.</p>
                            <Link
                                to={"/web-color-2/contrast-checker"}
                                className="link-button">
                                Contrast Checker
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Home;