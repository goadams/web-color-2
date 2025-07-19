import React from "react";
import "./ColorChoice.css"

const ColorChoice = ({ name, color, handleChangeHex, handleChangeColorInput }) => {
    const modName = name.replace(/\s+/g, '-').toLowerCase();

    return (
    <div className="color-choice">
        <div className={`${modName}-hex-wrapper`}>
            <label htmlFor={`${modName}-color-hex`}>{name} Hex:</label>
            <input
                type="text"
                id={`${modName}-color-hex`}
                name={`${modName}-color-hex`}
                value={`#${color.substring(1)}`}
                maxLength={7}
                className={`${modName}-input`}
                onChange={handleChangeHex}
            />
        </div>
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
)};

export default ColorChoice;