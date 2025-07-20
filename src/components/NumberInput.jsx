import NumericInput from 'react-numeric-input';
import React from "react";
import getCssVar from "../utils/getCssVar.js";

const NumberInput = ({ min, max, step, value, onChange, id, name }) => {

    const numberInputStyles = {
        wrap: {
            background: "transparent",
            border: "none",
            outline: "none",
        },
        input: {
            color: `${getCssVar("--color-text")}`,
            backgroundColor: "transparent",
            border: `1px solid ${getCssVar("--color-primary")}`,
            width: '100%',
            outline: 'none',
            boxShadow: 'none',
            textAlign: 'center',
            height: '4rem'
        },
        'input:focus': {
            border: `1px solid ${getCssVar("--color-accent")}`,
            outline: 'none',
            boxShadow: 'none',
            backgroundColor: "transparent",
        },
        btn: {
            background: `${getCssVar("--color-primary")}`,
            boxShadow: 'none',
            width: '4rem',
            border: `1px solid ${getCssVar("--color-background")}`
        },
        'btn:hover': {
            background: `${getCssVar("--color-primary-hover")}`
        },
        'btn:active': {
            background: `${getCssVar("--color-background")}`,
            boxShadow: 'none',
        },
        arrowUp: {
            borderBottomColor: `${getCssVar("--color-text")}`
        },
        arrowDown: {
            borderTopColor: `${getCssVar("--color-text")}`
        }
    };

    return (
        <NumericInput
            className="number-input"
            id={id}
            name={name}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            style={numberInputStyles}
        >
        </NumericInput>
    )
};

export default NumberInput;