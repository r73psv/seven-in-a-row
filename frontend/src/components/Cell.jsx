import React from "react";

function Cell({ value, onClick }) {
    const getColor = () => {
        if (value === "X") return "red";
        if (value === "O") return "blue";
        return "white";
    };

    return (
        <div className="cell" onClick={onClick}>
            <div className="disc" style={{ backgroundColor: getColor() }}></div>
        </div>
    );
}
export default Cell;
