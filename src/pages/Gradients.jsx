import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import ElevatedSection from "../components/ElevatedSection/ElevatedSection.jsx";
import OptionSelect from "../components/OptionSelect/OptionSelect.jsx";
import ColorChoice from "../components/ColorChoice/ColorChoice.jsx";
import { selectCustomStyles } from "../utils/selectCustomStyles.js";
import "./Gradients.css";
import NumberInput from "../components/NumberInput/NumberInput.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";
import SavedSection from "../components/SavedSection/SavedSection.jsx";

const Gradients = () => {
    const [colors, setColors] = useLocalStorage("gradientTool-colors", ["#00A2FF", "#1B6600"]);
    const [colorInputs, setColorInputs] = useLocalStorage("gradientTool-colorInputs", ["#00A2FF", "#1B6600"]);
    const [positions, setPositions] = useLocalStorage("gradientTool-positions", [0, 100]);
    const [angle, setAngle] = useLocalStorage("gradientTool-angle", 90);
    const [gradient, setGradient] = useLocalStorage("gradientTool-gradient", "linear");
    const [gradientCode, setGradientCode] = useLocalStorage("gradientTool-code", `linear-gradient(${angle}deg, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`);
    const [savedGradients, setSavedGradients] = useLocalStorage("gradientTool-saved", []);
    const [favorites, setFavorites] = useLocalStorage("gradientTool-favorites", []);

    const typeOptions = [
        { value: "linear", label: "Linear" },
        { value: "radial", label: "Radial" },
        { value: "conic", label: "Conic" }
    ];

    React.useEffect(() => {
        let code = '';
        if (gradient === "linear") {
            code = `linear-gradient(${angle}deg, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`;
        } else if (gradient === "radial") {
            code = `radial-gradient(circle, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`;
        } else if (gradient === "conic") {
            code = `conic-gradient(from ${angle}deg, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`;
        }
        setGradientCode(code);
    }, [gradient, angle, colors, positions, setGradientCode]);

    const handleChangeHex = (index, e) => {
        const filtered = e.target.value.replace(/[^0-9a-fA-F]/g, '');
        const hex = `#${filtered.toUpperCase()}`;
        setColorInputs(
            colorInputs.map((c, i) => i === index ? hex : c)
        );
        if (hex.length === 7) {
            setColors(
                colors.map((c, i) => i === index ? hex : c)
            );
        }
    };

    const handleDelete = (num, group) => {
        if (group === 'savedGradients') {
            setSavedGradients(prevGradients => prevGradients.filter((_, i) => i !== num));
        } else if (group === 'favorites') {
            setFavorites(prevFavs => prevFavs.filter((_, i) => i !== num));
        }
    };

    const handleChangeColorInput = (index, e) => {
        const newColor = e.target.value.toUpperCase();
        setColors(
            colors.map((c, i) => i === index ? newColor : c)
        );
        setColorInputs(
            colorInputs.map((c, i) => i === index ? newColor : c)
        );
    };

    const handleChangeGradient = (event) => {
        setGradient(event.target.value);
    };

    const isFavoriteGradient = (g) => {
        return favorites.some(fav =>
            fav.code === g.code &&
            fav.colors === g.colors
        );
    }

    const handleFavorite = (i, group) => {
        if (group === 'savedGradients') {
            const moveGradient = savedGradients[i];
            setSavedGradients(savedGradients.filter((_, index) => index !== i));
            setFavorites([moveGradient, ...favorites]);
        } else if (group === 'favorites') {
            const moveGradient = favorites[i];
            setFavorites(favorites.filter((_, index) => index !== i));
            setSavedGradients([moveGradient, ...savedGradients]);
        }
    };

    return (
        <>
            <Layout>
                <h1>Gradients</h1>

                <div style={{ background: gradientCode, width: "100%", height: "30rem" }}>

                </div>
                <div className="gradients-container">
                    <div className="gradients-type-container">
                        <ElevatedSection
                            maxWidth={"50rem"}
                            minWidth={"30rem"}
                        >
                            <OptionSelect
                                name="Gradient Type"
                                value={gradient}
                                styles={selectCustomStyles}
                                options={typeOptions}
                                onChange={handleChangeGradient}
                            >
                                {gradient !== "radial" && (
                                    <div className="gradient-angle-wrapper">
                                        <label htmlFor="gradient-angle-input">Angle</label>
                                        <NumberInput
                                            id="gradient-angle-input"
                                            min={0}
                                            max={360}
                                            step={2}
                                            value={angle}
                                            onChange={(e) => setAngle(e.target.value ?? 0)}
                                        >
                                        </NumberInput>
                                    </div>)}
                            </OptionSelect>
                        </ElevatedSection>
                    </div>

                    <div className="gradients-color-container">
                        <ElevatedSection maxWidth={"70rem"}>
                            <h2>Color Selection:</h2>
                            <div className="gradient-colors-wrapper">
                                <ColorChoice
                                    name="Color 1"
                                    color={colorInputs[0]}
                                    handleChangeHex={(e) => handleChangeHex(0, e)}
                                    handleChangeColorInput={(e) => handleChangeColorInput(0, e)}
                                    position={positions[0]}
                                    handleChangePosition={(e) => {
                                        const newVal = e.target.value ?? 0;
                                        setPositions(positions.map((p, i) => i === 0 ? newVal : p));
                                    }}
                                >
                                </ColorChoice>
                                <ColorChoice
                                    name="Color 2"
                                    color={colorInputs[1]}
                                    handleChangeHex={(e) => handleChangeHex(1, e)}
                                    handleChangeColorInput={(e) => handleChangeColorInput(1, e)}
                                    position={positions[1]}
                                    handleChangePosition={(e) => {
                                        const newVal = e.target.value ?? 0;
                                        setPositions(positions.map((p, i) => i === 1 ? newVal : p));
                                    }}
                                >
                                </ColorChoice>
                                <button
                                    className="gradient-reset-button"
                                    onClick={() => {
                                        setColors(["#00A2FF", "#1B6600"]);
                                        setColorInputs(["#00A2FF", "#1B6600"]);
                                        setPositions([0, 100]);
                                        setAngle(90);
                                    }}
                                >
                                    Reset Gradient
                                </button>
                            </div>
                        </ElevatedSection>
                    </div>

                    <div className="gradients-code-container">
                        <ElevatedSection maxWidth={"70rem"}>
                            <h2>CSS Code</h2>
                            <p className="gradient-code">{gradientCode}</p>
                            <button
                                className="gradient-save-button"
                                onClick={() => setSavedGradients(prevSaved => [ { colors: colors, code: gradientCode }, ...prevSaved ])}
                            >
                                Save Gradient
                            </button>
                        </ElevatedSection>
                    </div>

                    <div className="gradients-saved-container">
                        <ElevatedSection maxWidth={"160rem"}>
                            <h2>Saved Gradients</h2>
                            <div className="gradient-saved-wrapper">
                                {favorites.map((g, i) => (
                                    <SavedSection
                                        key={i}
                                        colors={g.colors}
                                        handleDelete={() => handleDelete(i, 'favorites')}
                                        title={g.code}
                                        gradientCode={g.code}
                                        handleFavorite={() => handleFavorite(i, 'favorites')}
                                        isFavorite={isFavoriteGradient(g)}
                                    />
                                ))}
                                {savedGradients.map((g, i) => (
                                    <SavedSection
                                        key={i}
                                        colors={g.colors}
                                        handleDelete={() => handleDelete(i, 'savedGradients')}
                                        title={g.code}
                                        gradientCode={g.code}
                                        handleFavorite={() => handleFavorite(i, 'savedGradients')}
                                        isFavorite={isFavoriteGradient(g)}
                                    />
                                ))}
                            </div>
                        </ElevatedSection>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Gradients;