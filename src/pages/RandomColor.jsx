import React from "react";
import Layout from "../components/Layout.jsx";
import getRandomColor from "../utils/getRandomColor.js";
import getTextBestColor from "../utils/getTextBestColor.js";
import "./RandomColor.css"
import hexToRgb from "../utils/hexToRbg.js";
import SavedSection from "../components/SavedSection.jsx";


const RandomColor = () => {
    const [color, setColor] = React.useState(getRandomColor());
    const [savedColors, setSavedColors] = React.useState([]);

    const populateRandomColors = (num) => {
        const newColors = [];
        for (let i = 0; i < num; i++) {
            newColors.push([getRandomColor()]);
        }
        setSavedColors([...newColors, ...savedColors]);
    };

    const handleDelete = (i) => {
        setSavedColors(savedColors.filter((_, index) => index !== i));
    };

    return (
        <>
            <Layout>
                <h1>Random Color</h1>
                <div className="random-color-display" style={{ background: color }}>
                    <p className="random-color-text" style={{ color: getTextBestColor(color) }}>
                        {color}
                    </p>
                    <p className="random-color-text" style={{ color: getTextBestColor(color) }}>
                        rgb({hexToRgb(color).r}, {hexToRgb(color).g}, {hexToRgb(color).b})
                    </p>
                </div>
                <div className="random-color-interact">
                    <button
                        className="random-color-btn"
                        onClick={() => setColor(getRandomColor())}>
                        New Color
                    </button>
                    <button
                        className="random-color-btn"
                        onClick={() => setSavedColors([ [color] , ...savedColors])}>
                        Save Color
                    </button>
                    <button
                        className="random-color-btn"
                        onClick={() => populateRandomColors(10)}>
                        Save 10 Random Colors
                    </button>
                </div>
                <div className="random-color-saved">
                    <h2>Saved Colors</h2>
                    <div className="saved-color-container">
                        {savedColors.map((c, i) => (
                            <SavedSection key={i} colors={c} handleDelete={() => handleDelete(i)} />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default RandomColor;