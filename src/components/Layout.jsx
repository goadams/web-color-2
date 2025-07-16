import React from "react";
import Header from "./Header.jsx";
import {Form} from "react-router-dom";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
    return (
        <>
            <div className="page-wrapper">
                <Header />
                    <main>{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;