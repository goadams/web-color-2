import "./ElevatedSection.css"

const ElevatedSection = ({ children, backgroundColor, width = "100%", maxWidth = "100%", gridArea = "auto" }) => (
    <div
        className="elevated-container"
        style={{ backgroundColor: backgroundColor, width: width, maxWidth: maxWidth, gridArea: gridArea }}
    >
        {children}
    </div>

);

export default ElevatedSection;