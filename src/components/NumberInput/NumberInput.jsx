import React from "react";
import "./NumberInput.css"

const NumberInput = ({ min, max, step, value, onChange, id, name }) => {

    // Intercept input and sanitize value
    const handleChange = (e) => {
        let val = e.target.value;

        val = val.replace(/[^0-9]/g, "");

        if (val > max) {
            val = max;
        }

        if (val.length > 1) {
            if (val[0] === '0') {
                val = val.substring(1);
            }
        }

        // If empty or valid number, call parent's onChange
        if (val === "" || !isNaN(val)) {
            onChange({
                target: {
                    name,
                    value: val
                }
            });
        }
    };

    return (
        <input
            className="number-input"
            id={id}
            name={name}
            type="text"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
        />
    )
};

export default NumberInput;