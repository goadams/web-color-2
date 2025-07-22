import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import ElevatedSection from "../components/ElevatedSection/ElevatedSection.jsx";
import OptionSelect from "../components/OptionSelect/OptionSelect.jsx";
import ColorChoice from "../components/ColorChoice/ColorChoice.jsx";
import { selectCustomStyles } from "../utils/selectCustomStyles.js";
import "./Gradients.css";
import NumberInput from "../components/NumberInput/NumberInput.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";

const Gradients = () => {
    const [colors, setColors] = useLocalStorage("gradientTool-colors", ["#00A2FF", "#1B6600"]);
    const [colorInputs, setColorInputs] = useLocalStorage("gradientTool-colorInputs", ["#00A2FF", "#1B6600"]);
    const [positions, setPositions] = useLocalStorage("gradientTool-positions", [0, 100]);
    const [angle, setAngle] = useLocalStorage("gradientTool-angle", 90);
    const [gradient, setGradient] = useLocalStorage("gradientTool-gradient", { value: "linear", label: "Linear"});
    const [gradientCode, setGradientCode] = useLocalStorage("gradientTool-code", `linear-gradient(${angle}deg, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`);

    const typeOptions = [
        { value: "linear", label: "Linear" },
        { value: "radial", label: "Radial" },
        { value: "conic", label: "Conic" }
    ];

    React.useEffect(() => {
        let code = '';
        if (gradient.value === "linear") {
            code = `linear-gradient(${angle}deg, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`;
        } else if (gradient.value === "radial") {
            code = `radial-gradient(circle, ${colors[0]} ${positions[0]}%, ${colors[1]} ${positions[1]}%)`;
        } else if (gradient.value === "conic") {
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

    const handleChangeColorInput = (index, e) => {
        const newColor = e.target.value.toUpperCase();
        setColors(
            colors.map((c, i) => i === index ? newColor : c)
        );
        setColorInputs(
            colorInputs.map((c, i) => i === index ? newColor : c)
        );
    };

    const handleChangeGradient = (selected) => {
        setGradient(selected);
    };

    return (
        <>
            <Layout>
                <h1>Gradients</h1>

                <div style={{ background: gradientCode, width: "100%", height: "30rem" }}>

                </div>
                <div className="gradients-container">
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
                            {gradient.value !== "radial" && (
                                <div className="gradient-angle-wrapper">
                                <label htmlFor="gradient-angle-input">Angle</label>
                                <NumberInput
                                    id="gradient-angle-input"
                                    min={0}
                                    max={360}
                                    step={2}
                                    value={angle}
                                    onChange={val => setAngle(val ?? 0)}
                                >
                                </NumberInput>
                            </div>)}
                        </OptionSelect>
                    </ElevatedSection>
                    <ElevatedSection maxWidth={"70rem"}>
                        <h2>Color Selection:</h2>
                        <div className="gradient-colors-wrapper">
                            <ColorChoice
                                name="Color 1"
                                color={colorInputs[0]}
                                handleChangeHex={(e) => handleChangeHex(0, e)}
                                handleChangeColorInput={(e) => handleChangeColorInput(0, e)}
                                position={positions[0]}
                                handleChangePosition={val => {
                                    const newVal = val ?? 0;
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
                                handleChangePosition={val => {
                                    const newVal = val ?? 0;
                                    setPositions(positions.map((p, i) => i === 1 ? newVal : p));
                                }}
                            >
                            </ColorChoice>
                        </div>
                    </ElevatedSection>
                    <ElevatedSection maxWidth={"70rem"}>
                        <h2>CSS Code:</h2>
                        <p className="gradient-code">{gradientCode}</p>
                    </ElevatedSection>
                </div>
            </Layout>
        </>
    );
};

export default Gradients;