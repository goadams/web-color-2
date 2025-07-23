import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import "./ColorPalettes.css";
import {
    generateTriadicPalette,
    generateAnalogousPalette,
    generateTetradicPalette,
    generateSquarePalette,
    generateSplitPalette,
    generateComplementaryPalette,
    generateMonoPalette
} from "../utils/paletteGenerators.js";
import hexToRgb from "../utils/hexToRbg.js";
import SavedSection from "../components/SavedSection/SavedSection.jsx";
import ElevatedSection from "../components/ElevatedSection/ElevatedSection.jsx";
import OptionSelect from "../components/OptionSelect/OptionSelect.jsx";
import ColorChoice from "../components/ColorChoice/ColorChoice.jsx";
import { selectCustomStyles } from "../utils/selectCustomStyles.js";
import useLocalStorage from "../hooks/useLocalStorage.js";


const ColorPalettes = () => {
    const [color, setColor] = useLocalStorage("paletteTool-color", "#A2B7C3");
    const [colorInput, setColorInput] = useLocalStorage("paletteTool-colorInput", "#A2B7C3");
    const [palette, setPalette] = useLocalStorage("paletteTool-palette", "Monochromatic");
    const [colorPalette, setColorPalette] = useLocalStorage("paletteTool-colorPalette", generateMonoPalette(color));
    const [savedPalettes, setSavedPalettes] = useLocalStorage("paletteTool-savedPalettes", []);
    const [favorites, setFavorites] = useLocalStorage("paletteTool-favorites", []);

    const typeOptions = [
        { value: "Monochromatic", label: "Monochromatic" },
        { value: "Analogous", label: "Analogous" },
        { value: "Complementary", label: "Complementary" },
        { value: "Split", label: "Split-Complementary" },
        { value: "Triadic", label: "Triadic" },
        { value: "Tetradic", label: "Tetradic" },
        { value: "Square", label: "Square" }
    ];

    React.useEffect(() => {
        switch (palette) {
            case "Monochromatic":
                setColorPalette(generateMonoPalette(color));
                break;
            case "Analogous":
                setColorPalette(generateAnalogousPalette(color));
                break;
            case "Complementary":
                setColorPalette(generateComplementaryPalette(color));
                break;
            case "Split":
                setColorPalette(generateSplitPalette(color));
                break;
            case "Triadic":
                setColorPalette(generateTriadicPalette(color));
                break;
            case "Tetradic":
                setColorPalette(generateTetradicPalette(color));
                break;
            case "Square":
                setColorPalette(generateSquarePalette(color));
                break;
        }
    }, [color, palette, setColorPalette]);

    const handleChangeHex = (e) => {
        const filtered = e.target.value.replace(/[^0-9a-fA-F]/g, '');
        const hex = `#${filtered.toUpperCase()}`
        setColorInput(hex);
        if (hex.length === 7) {
            setColor(hex);
        }
    };

    const handleChangeColorInput = (e) => {
        const hex = e.target.value.toUpperCase();
        setColor(hex);
        setColorInput(hex);
    };

    const handleChangePalette = (event) => {
        setPalette(event.target.value);
    };

    const handleDelete = (num, group) => {
        if (group === 'savedPalettes') {
            setSavedPalettes(prevPalettes => prevPalettes.filter((_, i) => i !== num));
        } else if (group === 'favorites') {
            setFavorites(prevFavorites => prevFavorites.filter((_, i) => i !== num));
        }
    };

    const handleSave = () => {
        setSavedPalettes([
            {
                colors: colorPalette,
                type: palette,
                baseColor: color
            },
            ...savedPalettes
        ]);
    }

    const isFavoritePalette = (pal) => {
        return favorites.some(fav =>
            fav.baseColor === pal.baseColor &&
            fav.type === pal.type &&
            fav.colors.length === pal.colors.length &&
            fav.colors.every((c, i) => c === pal.colors[i])
        );
    }

    const handleFavorite = (i, group) => {
        if (group === 'savedPalettes') {
            const movePalette = savedPalettes[i];
            setSavedPalettes(savedPalettes.filter((_, index) => index !== i));
            setFavorites([movePalette, ...favorites]);
        } else if (group === 'favorites') {
            const movePalette = favorites[i];
            setFavorites(favorites.filter((_, index) => index !== i));
            setSavedPalettes([movePalette, ...savedPalettes]);
        }
    };

    return (
        <>
            <Layout>
                <h1>Color Palettes</h1>
                <div className="palettes-container">
                    <ElevatedSection
                        gridArea="picker"
                        maxWidth={"40rem"}
                        minWidth={"30rem"}
                    >
                        <OptionSelect
                            name="Palette Type"
                            value={palette}
                            styles={selectCustomStyles}
                            options={typeOptions}
                            onChange={handleChangePalette}
                        >
                            <ColorChoice
                                name="Base Color"
                                color={colorInput}
                                handleChangeHex={handleChangeHex}
                                handleChangeColorInput={handleChangeColorInput}>
                            </ColorChoice>
                        </OptionSelect>
                    </ElevatedSection>

                    <ElevatedSection
                        gridArea='show'
                        width="auto"
                    >
                        <p className="palette-display-title">{color} {palette} Palette</p>
                        <div className="palette-color-container">
                            {colorPalette.map((c, i) => (
                                <div className="palette-color-wrapper" key={i}>
                                    <p>{c}</p>
                                    <p>rgb({hexToRgb(c).r}, {hexToRgb(c).g}, {hexToRgb(c).b})</p>
                                    <div
                                        className="palette-display-square"
                                        style={{background: c}}
                                    >
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="save-palette" onClick={handleSave}>Save Palette</button>
                    </ElevatedSection>
                    <ElevatedSection
                        gridArea={'saved'}
                        maxWidth={"220rem"}
                    >
                        <h2>Saved Palettes</h2>
                        <div className="palette-saved">
                            {favorites.map((pal, i) => (
                                <SavedSection
                                    key={i}
                                    colors={pal.colors}
                                    handleDelete={() => handleDelete(i, 'favorites')}
                                    title={`${pal.baseColor} ${pal.type} Palette`}
                                    handleFavorite={() => handleFavorite(i, 'favorites')}
                                    isFavorite={isFavoritePalette(pal)}
                                />
                            ))}
                            {savedPalettes.map((pal, i) => (
                                <SavedSection
                                    key={i}
                                    colors={pal.colors}
                                    handleDelete={() => handleDelete(i, 'savedPalettes')}
                                    title={`${pal.baseColor} ${pal.type} Palette`}
                                    handleFavorite={() => handleFavorite(i, 'savedPalettes')}
                                    isFavorite={isFavoritePalette(pal)}
                                />
                            ))}
                        </div>
                    </ElevatedSection>
                </div>
            </Layout>
        </>
    );
};

export default ColorPalettes;