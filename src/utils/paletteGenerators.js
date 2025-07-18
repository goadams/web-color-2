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
    const base = hexToHSL(hex);  // [h, s, l], all in 0-360, 0-100, 0-100 respectively
    const [h, s, l] = base;
    const complementHue = (h + 180) % 360;
    const lighter = Math.min(l + 20, 100);
    const darker = Math.max(l - 20, 0);

    return [
        hslToHex(h, s, l),                 // Base
        hslToHex(complementHue, s, l),     // Complement
        hslToHex(h, s, lighter),           // Lighter base
        hslToHex(complementHue, s, lighter), // Lighter complement
        hslToHex(h, s, darker),            // Darker base
        hslToHex(complementHue, s, darker)   // Darker complement
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

export function generateSplitPalette(hex) {
    const base = hexToHSL(hex); // base[0] is the hue
    const split1 = (base[0] + 150) % 360;
    const split2 = (base[0] + 210) % 360;
    return [
        hslToHex(base[0], base[1], base[2]),  // Base color
        hslToHex(split1, base[1], base[2]),   // Split complement 1
        hslToHex(split2, base[1], base[2]),   // Split complement 2
    ];
}

export function generateSquarePalette(hex) {
    const [h, s, l] = hexToHSL(hex); // Confirm output is [h, s, l]
    const palette = [];
    for (let i = 0; i < 4; i++) {
        const hue = (h + i * 90) % 360;
        palette.push(hslToHex(hue, s, l));
    }
    return palette;
}

export function generateTetradicPalette(hex) {
    const base = hexToHSL(hex); // Returns [H, S, L]
    // Rectangle: 0°, +90°, +180°, +270°
    const angles = [0, 60, 180, 240];
    return angles.map(a => hslToHex((base[0] + a) % 360, base[1], base[2]));
}

export function generateTriadicPalette(hex) {
    const [h, s, l] = hexToHSL(hex);
    const triad = [
        [h, s, l],
        [(h + 120) % 360, s, l],
        [(h + 240) % 360, s, l],
    ];
    return triad.map(([hue, sat, light]) => hslToHex(hue, sat, light));
}