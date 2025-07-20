import getCssVar from "./getCssVar.js";

export const selectCustomStyles = {
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

