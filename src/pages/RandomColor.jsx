import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import getRandomColor from "../utils/getRandomColor.js";
import getTextBestColor from "../utils/getTextBestColor.js";
import "./RandomColor.css"
import hexToRgb from "../utils/hexToRbg.js";
import SavedSection from "../components/SavedSection/SavedSection.jsx";
import ElevatedSection from "../components/ElevatedSection/ElevatedSection.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";

const RandomColor = () => {
    const [color, setColor] = useLocalStorage('randomTool-color', getRandomColor());
    const [savedColors, setSavedColors] = useLocalStorage('randomTool-savedColors', []);
    const [favorites, setFavorites] = useLocalStorage('randomTool-favorites', []);

    const populateRandomColors = (num) => {
        const newColors = [];
        for (let i = 0; i < num; i++) {
            newColors.push([getRandomColor()]);
        }
        setSavedColors([...newColors, ...savedColors]);
    };

    const isFavoriteColor = (color) => favorites.some(favArr => favArr[0] === color[0]);

    const handleDelete = (i) => {
        setSavedColors(savedColors.filter((_, index) => index !== i));
    };

    const handleDeleteFav = (i) => {
        setFavorites(favorites.filter((_, index) => index !== i));
    };

    const handleFavorite = (i, group) => {
        if (group === 'savedColors') {
            const moveColor = savedColors[i];
            setSavedColors(savedColors.filter((_, index) => index !== i));
            setFavorites([ moveColor, ...favorites ]);
        } else if (group === 'favorites') {
            const moveColor = favorites[i];
            setFavorites(favorites.filter((_, index) => index !== i));
            setSavedColors([ moveColor, ...savedColors ]);
        }
    };


    return (
        <>
            <Layout>
                <h1>Random Color</h1>
                <ElevatedSection width={"120rem"}>
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
                </ElevatedSection>

                <ElevatedSection maxWidth={"147rem"}>
                    <h2>Saved Colors</h2>
                    <div className="saved-color-container">
                        {favorites.length > 0 && (
                            <div className="saved-color-container">
                                {favorites.map((c, i) => (
                                    <SavedSection
                                        key={i}
                                        colors={c}
                                        handleDelete={() => handleDeleteFav(i)}
                                        handleFavorite={() => handleFavorite(i, 'favorites')}
                                        isFavorite={isFavoriteColor(c)}
                                    />
                                ))}
                            </div>
                        )}
                        {savedColors.map((c, i) => (
                            <SavedSection
                                key={i}
                                colors={c}
                                handleDelete={() => handleDelete(i)}
                                handleFavorite={() => handleFavorite(i, 'savedColors')}
                                isFavorite={isFavoriteColor(c)}
                            />
                        ))}
                    </div>
                </ElevatedSection>
            </Layout>
        </>
    );
};

export default RandomColor;