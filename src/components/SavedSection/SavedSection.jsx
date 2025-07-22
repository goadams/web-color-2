import hexToRgb from "../../utils/hexToRbg.js";
import React from "react";
import "./SavedSection.css";

const SavedSection = ({ colors = [], handleDelete, title = '', handleFavorite, isFavorite, gradientCode }) => (

    <div className="saved-color-wrapper">
        <div className="saved-color-heading-wrapper">
            {title && <p className="saved-title">{title}</p>}
            <button
                className={`star-button ${isFavorite ? 'favorite' : ''}`}
                onClick={() => handleFavorite()}
                aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            >
                {isFavorite ? '★' : '☆'}
            </button>
        </div>
        {gradientCode && (
            <div style={{ background: gradientCode, height: `10rem`, width: `100%` }}></div>
        )}
        {!gradientCode && (
            <div className="saved-color-set">
                {colors.map((c, i) => (
                    <div className="saved-display" key={i} >
                        <p className="saved-color-hex">{c}</p>
                        <p className="saved-color-rgb">rgb({hexToRgb(c).r}, {hexToRgb(c).g}, {hexToRgb(c).b})</p>
                        <div className="saved-color" style={{ background: c, width: "10rem", height: "5rem" }}></div>
                    </div>
                ))}
            </div>
        )}
        <button className="saved-delete" onClick={handleDelete}>Delete</button>
    </div>
);

export default SavedSection;