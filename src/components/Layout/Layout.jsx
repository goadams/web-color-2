import React from "react";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";

const Layout = ({ children, header = true }) => {
    return (
        <>
            <div className="page-wrapper">
                {header && (<Header />)}
                    <main>{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;