import hexToHSL from "./hexToHSL.js";
import hslToHex from "./hslToHex.js";

export const paletteGenerators = [
    generateComplementaryPalette,
    generateAnalogousPalette,
    generateMonoPalette,
    generateTriadicPalette,
    generateSplitPalette,
    generateSquarePalette,
    generateTetradicPalette,
];

export function generateAnalogousPalette(hex, count = 5, angle = 15) {
    const base = hexToHSL(hex);
    const palette = [];
    const half = Math.floor(count / 2);

    for (let i = -half; i <= half; i++) {
        const hue = (base[0] + i * angle + 360) % 360;
        palette.push(hslToHex(hue, base[1], base[2]));
    }
    return palette;
}

export function generateComplementaryPalette(hex) {
    const base = hexToHSL(hex);
    const complementHue = (base[0] + 180) % 360;
    return [
        hslToHex(base[0], base[1], base[2]),                        // Base
        hslToHex(complementHue, base[1], base[2]),                 // Complement
        hslToHex(base[0], base[1], Math.min(base[2] + 20, 100)),    // Lighter base
        hslToHex(complementHue, base[1], Math.min(base[2] + 20, 100)), // Lighter complement
        hslToHex(base[0], base[1], Math.max(base[2] - 20, 0)),      // Darker base
    ];
}

export function generateMonoPalette(hex, count = 5) {
    const base = hexToHSL(hex);
    const palette = [];
    // Evenly distribute lightness values for tints and shades
    const step = 40 / (count - 1); // e.g., from l-20 to l+20
    for (let i = 0; i < count; i++) {
        let l = Math.max(0, Math.min(100, base[2] - 20 + step * i));
        palette.push(hslToHex(base[0], base[1], l));
    }
    return palette;
}

export function generateSplitPalette(hex, angle = 30) {
    const base = hexToHSL(hex);
    const compHue = (base[0] + 180) % 360;
    const split1 = (compHue - angle + 360) % 360;
    const split2 = (compHue + angle) % 360;
    return [
        hslToHex(base[0], base[1], base[2]),      // Base color
        hslToHex(split1, base[1], base[2]),      // Split complement 1
        hslToHex(split2, base[1], base[2]),      // Split complement 2
    ];
}

export function generateSquarePalette(hex) {
    const base = hexToHSL(hex);
    const palette = [];
    for (let i = 0; i < 4; i++) {
        let hue = (base[0] + i * 90) % 360;
        palette.push(hslToHex(hue, base[1], base[2]));
    }
    return palette;
}

export function generateTetradicPalette(hex) {
    const base = hexToHSL(hex);
    // Rectangle: 0°, +60°, +180°, +240°
    const angles = [0, 60, 180, 240];
    return angles.map(a => hslToHex((base[0] + a) % 360, base[1], base[2]));
}

export function generateTriadicPalette(hex) {
    const base = hexToHSL(hex);
    const hue1 = (base[0] + 120) % 360;
    const hue2 = (base[0] + 240) % 360;
    return [
        hslToHex(base[0], base[1], base[2]),    // Base color
        hslToHex(hue1, base[1], base[2]),      // Triad partner 1
        hslToHex(hue2, base[1], base[2]),      // Triad partner 2
    ];
}