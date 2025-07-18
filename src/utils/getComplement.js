export default function getComplementaryColor(hex) {
    // Remove '#' if present
    let color = hex.replace(/^#/, '');

    // Handle 3-digit hex
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }

    // Now it should be 6 digits
    if (color.length !== 6) {
        throw new Error('Invalid hex color.');
    }

    // Parse the hex color to an integer
    let intColor = parseInt(color, 16);

    // Invert the color
    let complement = (0xFFFFFF ^ intColor).toString(16).padStart(6, '0');

    // Return the complementary color in hex format
    return `#${complement}`;
}