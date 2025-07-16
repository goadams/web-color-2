export default function getComplementaryColor(hex) {
    // Remove '#' if present
    let color = hex.replace('#', '');
    // Parse the hex color to an integer
    let intColor = parseInt(color, 16);
    // Invert the color
    let complement = (0xFFFFFF ^ intColor).toString(16).padStart(6, '0');
    // Return the complementary color in hex format
    return `#${complement}`;
}