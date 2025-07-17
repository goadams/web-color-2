export default function getCssVar(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}