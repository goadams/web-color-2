import React from "react";
import "./ColorChoice.css"
import NumberInput from "../NumberInput/NumberInput.jsx";

const ColorChoice = ({ name, color, handleChangeHex, handleChangeColorInput, position, handleChangePosition }) => {
    const modName = name.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="color-choice">
            <div className={`${modName}-hex-wrapper`}>
                <label htmlFor={`${modName}-color-hex`}>{name} Hex:</label>
                <input
                    type="text"
                    id={`${modName}-color-hex`}
                    name={`${modName}-color-hex`}
                    value={color}
                    maxLength={7}
                    className={`${modName}-input`}
                    onChange={handleChangeHex}
                />
            </div>
            <div className={`${modName}-color-input-wrapper`}>
                <label htmlFor={`${modName}-color-input`}>{name} Picker:</label>
                <input
                    type="color"
                    id={`${modName}-color-input`}
                    name={`${modName}-color-input`}
                    className={`${modName}-input`}
                    value={color}
                    onChange={handleChangeColorInput}
                />
            </div>
            {position !== undefined && (
                <div className={`${modName}-position-wrapper`}>
                    <label htmlFor={`${modName}-color-position`}>{name} Position:</label>
                    <NumberInput
                        id={`${modName}-color-position`}
                        name={`${modName}-color-position`}
                        min={0}
                        max={100}
                        step={2}
                        value={position}
                        onChange={handleChangePosition}
                    >
                    </NumberInput>
                </div>
            )}
        </div>
)};

export default ColorChoice;