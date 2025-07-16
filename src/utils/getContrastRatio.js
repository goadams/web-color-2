import getLuminance from "./getLuminance.js";
import hexToRgb from "./hexToRbg.js";

export default function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hexToRgb(hex1));
    const lum2 = getLuminance(hexToRgb(hex2));
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}