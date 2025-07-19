import React from "react";
import Layout from "../components/Layout.jsx";
import "./ColorPalettes.css";
import getCssVar from "../utils/getCssVar.js";
import {
    generateTriadicPalette,
    generateAnalogousPalette,
    generateTetradicPalette,
    generateSquarePalette,
    generateSplitPalette,
    generateComplementaryPalette,
    generateMonoPalette,
    generateAnalogousComplementaryPalette
} from "../utils/paletteGenerators.js";
import hexToRgb from "../utils/hexToRbg.js";
import SavedSection from "../components/SavedSection.jsx";
import ElevatedSection from "../components/ElevatedSection.jsx";
import OptionSelect from "../components/OptionSelect.jsx";
import ColorChoice from "../components/ColorChoice.jsx";


const ColorPalettes = () => {
    const [color, setColor] = React.useState("#A2B7C3");
    const [palette, setPalette] = React.useState({ value: "monochromatic", label: "Monochromatic" });
    const [colorPalette, setColorPalette] = React.useState(generateMonoPalette(color));
    const [savedPalettes, setSavedPalettes] = React.useState([]);

    const typeOptions = [
        { value: "monochromatic", label: "Monochromatic" },
        { value: "analogous", label: "Analogous" },
        { value: "complementary", label: "Complementary" },
        { value: "split", label: "Split-Complementary" },
        { value: "triadic", label: "Triadic" },
        { value: "tetradic", label: "Tetradic" },
        { value: "square", label: "Square" },
        { value: "analogous-complementary", label: "Analogous Complementary" }
    ];

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: getCssVar("--color-elevated"),
            borderColor: getCssVar("--color-primary"),
            color: getCssVar("--color-text"),
            outlineColor: getCssVar("--color-accent"),
            boxShadow: 'none',
            "&:hover": {
                borderColor: getCssVar("--color-primary"),
            },
        }),
        input: (base) => ({
            ...base,
            color: getCssVar("--color-text"),
            borderColor: getCssVar("--color-primary"),
        }),
        singleValue: (base) => ({
            ...base,
            color: getCssVar("--color-text"),
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? getCssVar("--color-elevated")
                : state.isFocused ? getCssVar("--color-primary-hover") : getCssVar("--color-primary"),
            color: getCssVar("--color-text"),
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: getCssVar("--color-elevated"),
        }),
    };

    React.useEffect(() => {
        switch (palette.value) {
            case "monochromatic":
                setColorPalette(generateMonoPalette(color));
                break;
            case "analogous":
                setColorPalette(generateAnalogousPalette(color));
                break;
            case "complementary":
                setColorPalette(generateComplementaryPalette(color));
                break;
            case "split":
                setColorPalette(generateSplitPalette(color));
                break;
            case "triadic":
                setColorPalette(generateTriadicPalette(color));
                break;
            case "tetradic":
                setColorPalette(generateTetradicPalette(color));
                break;
            case "square":
                setColorPalette(generateSquarePalette(color));
                break;
            case "analogous-complementary":
                setColorPalette(generateAnalogousComplementaryPalette(color));
                break;
        }
    }, [color, palette]);

    const handleChangeHex = (e) => {
        const filtered = e.target.value.replace(/[^0-9a-fA-F]/g, '');
        setColor(`#${filtered.toUpperCase()}`);
    };

    const handleChangeColorInput = (e) => {
        setColor(e.target.value.toUpperCase());
    };

    const handleChangePalette = (selected) => {
        setPalette(selected);
    };

    const handleDelete = (num) => {
        setSavedPalettes(prevPalettes => prevPalettes.filter((_, i) => i !== num));
    };

    const handleSave = () => {
        setSavedPalettes([
            {
                colors: colorPalette,
                type: palette.label,
                baseColor: color
            },
            ...savedPalettes
        ]);
    }

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
                            styles={customStyles}
                            options={typeOptions}
                            onChange={handleChangePalette}
                        >
                            <ColorChoice
                                name="Base Color"
                                color={color}
                                handleChangeHex={handleChangeHex}
                                handleChangeColorInput={handleChangeColorInput}
                            ></ColorChoice>
                        </OptionSelect>
                    </ElevatedSection>

                    <ElevatedSection
                        gridArea='show'
                        width="auto"
                    >
                        <p className="palette-display-title">{color} {palette.label} Palette</p>
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
                    >
                        <h2>Saved Palettes</h2>
                        <div className="palette-saved">
                            {savedPalettes.map((pal, i) => (
                                <SavedSection
                                    key={i}
                                    colors={pal.colors}
                                    handleDelete={() => handleDelete(i)}
                                    title={`${pal.baseColor} ${pal.type} Palette`}
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