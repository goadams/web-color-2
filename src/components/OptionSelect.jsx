import React from "react";
import Select, { components as Components } from 'react-select';
import "./OptionSelect.css"

const MaxLengthInput = (props) => {
    const { maxLength } = props.selectProps;
    return <Components.Input {...props} maxLength={maxLength} />;
};

const OptionSelect = ({ children, name, value, styles, options, onChange, maxLength = 25, flexDirection }) => {
    const modName = name.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="os-container" style={{ display: 'flex', flexDirection: flexDirection }}>
            <div className="os-select-wrapper">
                <label htmlFor={`${modName}-select`}>{name} Select:</label>
                <Select
                    className={`${modName}-select os-select`}
                    components={{Input: MaxLengthInput}}
                    maxLength={maxLength}
                    inputId={`${modName}-select`}
                    name={`${modName}-select`}
                    value={value}
                    styles={styles}
                    options={options}
                    onChange={onChange}
                />
            </div>
            {children}
        </div>
)};

export default OptionSelect;