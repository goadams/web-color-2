import React from "react";
import Layout from "../components/Layout.jsx";

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
            </Layout>
        </>
    );
};

export default Home;