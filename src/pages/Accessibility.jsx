import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import ElevatedSection from "../components/ElevatedSection/ElevatedSection.jsx";
import ColorChoice from "../components/ColorChoice/ColorChoice.jsx";
import "./Accessibility.css"
import OptionSelect from "../components/OptionSelect/OptionSelect.jsx";
import {selectCustomStyles} from "../utils/selectCustomStyles.js";
import { Slider, SliderTrack, SliderThumb, SliderOutput, Label } from "react-aria-components";
import hexToHSL from "../utils/hexToHSL.js";
import getContrastRatio from "../utils/getContrastRatio.js";
import getTextBestColor from "../utils/getTextBestColor.js";
import hslToHex from "../utils/hslToHex.js";
import getRandomColor from "../utils/getRandomColor.js";
import useLocalStorage from "../hooks/useLocalStorage.js";


function getGradeColor(grade) {
    switch (grade) {
        case "PASS":
            return "#37A925";
        case "FAIL":
            return "#e55";
        case "SOME":
            return "#fc3";
        default:
            return "#000";
    }
}

const Accessibility = () => {
    const [sampleText, setSampleText] = React.useState("This is sample text...");
    const [grades, setGrades] = React.useState(['PASS', 'PASS', 'PASS', 'PASS']);
    const [colors, setColors] = useLocalStorage("accessTool-colors",['#000000', '#FFFFFF']);
    const [colorInputs, setColorInputs] = useLocalStorage("accessTool-colorInputs",['#000000', '#FFFFFF']);
    const [level, setLevel] = useLocalStorage("accessTool-level",{ value: 'w21aaa', label: 'WCAG 2.1 AAA' });
    const [tool] = React.useState({ value: "contrast", label: "Contrast Checker" });
    const [ratio, setRatio] = useLocalStorage("accessTool-ratio",getContrastRatio(colors[0], colors[1]).toFixed(2));

    const levelOptions = [
        { value: 'w21aa', label: 'WCAG 2.1 AA' },
        { value: 'w21aaa', label: 'WCAG 2.1 AAA' },
    ];

    // const toolOptions = [
    //     { value: "contrast", label: "Contrast Checker" },
    //     { value: "blind", label: "Color Blind Safety" }
    // ];

    React.useEffect(() => {
        setRatio(getContrastRatio(colors[0], colors[1]).toFixed(2));
    }, [colors, setRatio]);

    React.useEffect(() => {
        const grades = ['', '', '', ''];
        if (level.value === 'w21aa') {
            grades[3] = ratio >= 3 ? "PASS" : "FAIL";
            grades[2] = ratio >= 3 ? "PASS" : "FAIL";
            grades[1] = ratio >= 4.5 ? "PASS" : "FAIL";
            grades[0] = ratio >= 4.5 ? "PASS" : (ratio >= 3 ? "SOME" : "FAIL");
        } else if (level.value === 'w21aaa') {
            grades[3] = ratio >= 3 ? "PASS" : "FAIL";
            grades[2] = ratio >= 4.5 ? "PASS" : "FAIL";
            grades[1] = ratio >= 7 ? "PASS" : "FAIL";
            grades[0] = ratio >= 7 ? "PASS" : (ratio >= 3 ? "SOME" : "FAIL");
        }
        setGrades(grades);
    }, [ratio, level]);

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

    // const handleChangeTool = (selected) => {
    //     setTool(selected);
    // };

    const handleChangeLevel = (selected) => {
        setLevel(selected);
    };

    return (
        <>
            <Layout>
                <h1>Contrast Checker</h1>
                <div className="accessibility-container">
                    {/*<ElevatedSection*/}
                    {/*    maxWidth={"50rem"}*/}
                    {/*    minWidth={"30rem"}*/}
                    {/*>*/}
                    {/*    <OptionSelect*/}
                    {/*        name="Tool"*/}
                    {/*        value={tool}*/}
                    {/*        styles={selectCustomStyles}*/}
                    {/*        options={toolOptions}*/}
                    {/*        onChange={handleChangeTool}*/}
                    {/*    >*/}
                    {/*    </OptionSelect>*/}
                    {/*</ElevatedSection>*/}

                    {tool.value === 'contrast' && (
                        <div className="contrast-container">
                            <div className="contrast-options-container">
                                <ElevatedSection
                                    maxWidth={"50rem"}
                                    minWidth={"30rem"}
                                >
                                    <OptionSelect
                                        name="Criteria Level"
                                        value={level}
                                        styles={selectCustomStyles}
                                        options={levelOptions}
                                        onChange={handleChangeLevel}
                                    >
                                    </OptionSelect>
                                </ElevatedSection>

                                <ElevatedSection width="auto">
                                    <div className="contrast-colors-wrapper">
                                        <ColorChoice
                                            name="Foreground Color"
                                            color={colorInputs[0]}
                                            handleChangeHex={(e) => handleChangeHex(0, e)}
                                            handleChangeColorInput={(e) => handleChangeColorInput(0, e)}
                                        >
                                            <div className={'slider-wrapper'}>
                                                <Slider
                                                    id="foreground-slider"
                                                    value={hexToHSL(colors[0])[2]}
                                                    onChange={val => {
                                                        const newLight = Number(val);
                                                        const [hue, sat] = hexToHSL(colors[0]);
                                                        const newHex = hslToHex(hue, sat, newLight);
                                                        setColors(prev => prev.map((c, i) => i === 0 ? newHex : c));
                                                        setColorInputs(prev => prev.map((c, i) => i === 0 ? newHex : c));
                                                    }}
                                                    min={0}
                                                    max={100}
                                                >
                                                    <Label>Foreground Lightness</Label>
                                                    <SliderOutput />
                                                    <SliderTrack>
                                                        <SliderThumb />
                                                    </SliderTrack>
                                                </Slider>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const rand = getRandomColor();
                                                    setColors(prev => prev.map((c, i) => i === 0 ? rand : c))
                                                    setColorInputs(prev => prev.map((c, i) => i === 0 ? rand : c))
                                                }}
                                            >Random Foreground</button>
                                        </ColorChoice>
                                        <ColorChoice
                                            name="Background Color"
                                            color={colorInputs[1]}
                                            handleChangeHex={(e) => handleChangeHex(1, e)}
                                            handleChangeColorInput={(e) => handleChangeColorInput(1, e)}
                                        >
                                            <div className={'slider-wrapper'}>
                                                <Slider
                                                    id="background-slider"
                                                    value={hexToHSL(colors[1])[2]}
                                                    onChange={val => {
                                                        const newLight = Number(val);
                                                        const [hue, sat] = hexToHSL(colors[1]);
                                                        const newHex = hslToHex(hue, sat, newLight);
                                                        setColors(prev => prev.map((c, i) => i === 1 ? newHex : c));
                                                        setColorInputs(prev => prev.map((c, i) => i === 1 ? newHex : c));
                                                    }}
                                                    min={0}
                                                    max={100}
                                                >
                                                    <Label>Background Lightness</Label>
                                                    <SliderOutput />
                                                    <SliderTrack>
                                                        <SliderThumb />
                                                    </SliderTrack>
                                                </Slider>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const rand = getRandomColor();
                                                    setColors(prev => prev.map((c, i) => i === 1 ? rand : c))
                                                    setColorInputs(prev => prev.map((c, i) => i === 1 ? rand : c))
                                                }}
                                            >Random Background</button>
                                        </ColorChoice>
                                    </div>
                                    <div>
                                        <h2>Contrast Ratio</h2>
                                        <p className="contrast-ratio">{ratio}:1</p>
                                        <p className="contrast-grade contrast-grade-ratio" style={{ backgroundColor: getGradeColor(grades[0]), color: getTextBestColor(getGradeColor(grades[0]))}}>{grades[0]}</p>
                                    </div>
                                </ElevatedSection>
                            </div>

                            <div className="contrast-preview-container">
                                <ElevatedSection maxWidth={"145rem"}>
                                    <h2>Previews</h2>
                                    <div className="contrast-previews-wrapper">
                                        <div style={{ color: colors[0], backgroundColor: colors[1], borderColor: getTextBestColor(colors[1]) }}>
                                            <div className="contrast-previews-pass-wrapper">
                                                <p style={{ color: getTextBestColor(colors[1])}}>Standard Text</p>
                                                <p className="contrast-grade" style={{ backgroundColor: getGradeColor(grades[1]), color: getTextBestColor(getGradeColor(grades[1]))}}>{grades[1]}</p>
                                            </div>
                                            <p className="contrast-previews-standard">A vivid mix of hues jumps quickly, dazzling eyes with zest. When black text overlays a white background, visibility peaks; yet, quirky magenta or yellow fonts perplex viewers.</p>
                                        </div>
                                        <div style={{ color: colors[0], backgroundColor: colors[1], borderColor: getTextBestColor(colors[1]) }}>
                                            <div className="contrast-previews-pass-wrapper">
                                                <p style={{ color: getTextBestColor(colors[1])}}>Large Text</p>
                                                <p className="contrast-grade" style={{ backgroundColor: getGradeColor(grades[2]), color: getTextBestColor(getGradeColor(grades[2]))}}>{grades[2]}</p>
                                            </div>
                                            <p className="contrast-previews-large">A vivid mix of hues jumps quickly, dazzling eyes with zest. When black text overlays a white background, visibility peaks; yet, quirky magenta or yellow fonts perplex viewers.</p>
                                        </div>
                                        <div style={{ color: colors[0], backgroundColor: colors[1], borderColor: getTextBestColor(colors[1]) }}>
                                            <div className="contrast-previews-pass-wrapper">
                                                <p style={{ color: getTextBestColor(colors[1])}}>Graphics and UI</p>
                                                <p className="contrast-grade" style={{ backgroundColor: getGradeColor(grades[3]), color: getTextBestColor(getGradeColor(grades[3]))}}>{grades[3]}</p>
                                            </div>
                                            <div className="contrast-previews-graphic" style={{ backgroundColor: colors[1] }}>
                                                <div className="graphic-display">
                                                    <svg
                                                        id="rectIcon"
                                                        width="80"
                                                        height="80"
                                                        viewBox="0 0 100 100"
                                                        style={{display: "block", color: colors[0], margin: "auto" }}
                                                    >
                                                        <rect
                                                            width="75"
                                                            height="50"
                                                            x={14}
                                                            y={26}
                                                            fill={colors[0]}
                                                        />
                                                    </svg>
                                                    <svg
                                                        id="starIcon"
                                                        width="80"
                                                        height="80"
                                                        viewBox="0 0 100 100"
                                                        style={{ display: "block", color: colors[0], margin: "auto" }}
                                                    >
                                                        <polygon
                                                            points="50,10 61,39 92,39 66,59 75,90 50,70 25,90 34,59 8,39 39,39"
                                                            fill={colors[0]}
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    style={{ borderColor: colors[0], borderWidth: 2, borderStyle: "solid" }}
                                                    value={sampleText}
                                                    onChange={(e) => setSampleText(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </ElevatedSection>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Accessibility;