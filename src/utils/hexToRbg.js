export default function hexToRgb(hex) {
    // Remove hash if present
    hex = hex.replace(/^#/, '');
    // Expand shorthand form (e.g. "03F") to full form ("0033FF")
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }
    const num = parseInt(hex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}