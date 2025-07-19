import "./ElevatedSection.css"

const ElevatedSection = ({ children, backgroundColor, width = "100%", maxWidth = "100%", minWidth = width, gridArea = "auto" }) => (
    <div
        className="elevated-container"
        style={{ backgroundColor: backgroundColor, width: width, maxWidth: maxWidth, minWidth: minWidth, gridArea: gridArea }}
    >
        {children}
    </div>

);

export default ElevatedSection;