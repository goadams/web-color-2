import React from "react";
import "./OptionSelect.css"

const OptionSelect = ({ children, name, value, options, onChange, flexDirection }) => {
    const modName = name.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="os-container" style={{ display: 'flex', flexDirection: flexDirection }}>
            <div className="os-select-wrapper">
                <label htmlFor={`${modName}-select`}>{name} Select:</label>
                <select
                    className={`${modName}-select os-select`}
                    id={`${modName}-select`}
                    name={`${modName}-select`}
                    value={value}
                    onChange={onChange}
                >
                    {options.map(op => (
                        <option key={op.value} value={op.value}>
                            {op.label}
                        </option>
                    ))}
                </select>
            </div>
            {children}
        </div>
)};

export default OptionSelect;