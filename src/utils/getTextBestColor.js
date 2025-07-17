import getContrastRatio from "./getContrastRatio.js";

export default function getTextBestColor(backgroundColor) {
    const whiteContrast = getContrastRatio(backgroundColor, '#FFFFFF');
    const blackContrast = getContrastRatio(backgroundColor, '#000000');
    return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
}