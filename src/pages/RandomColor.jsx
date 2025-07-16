import React from "react";
import Layout from "../components/Layout.jsx";
import getRandomColor from "../utils/getRandomColor.js";
import getTextBestColor from "../utils/getTextBestColor.js";
import "./RandomColor.css"
import hexToRgb from "../utils/hexToRbg.js";

const RandomColor = () => {
    const [color, setColor] = React.useState(getRandomColor());
    const [savedColors, setSavedColors] = React.useState([]);

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
                        onClick={() => setSavedColors([color, ...savedColors])}>
                        Save Color
                    </button>
                    <button
                        className="random-color-btn"
                        onClick={() => setSavedColors([getRandomColor(), getRandomColor(), getRandomColor(),
                            getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(),
                            getRandomColor(), getRandomColor(), ...savedColors])}>
                        Save 10 Random Colors
                    </button>
                </div>
                <div className="random-color-saved">
                    <h2>Saved Colors</h2>
                    <div className="saved-color-container">
                        {savedColors.map((c, i) => (
                            <div className="saved-display" key={i} >
                                <p className="saved-color-hex">{c}</p>
                                <p className="saved-color-rgb">rgb({hexToRgb(c).r}, {hexToRgb(c).g}, {hexToRgb(c).b})</p>
                                <div className="saved-color" style={{ background: c }}></div>
                                <button
                                    onClick={() => handleDelete(i)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default RandomColor;