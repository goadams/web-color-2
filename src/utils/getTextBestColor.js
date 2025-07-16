import getContrastRatio from "./getContrastRatio.js";

export default function getTextBestColor(backgroundColor) {
    const whiteContrast = getContrastRatio(backgroundColor, '#DDDDFF');
    const blackContrast = getContrastRatio(backgroundColor, '#111111');
    return whiteContrast > blackContrast ? '#DDDDFF' : '#111111';
}