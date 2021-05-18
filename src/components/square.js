import React from "react";

const Square = ({ value, onClick2 }) => {
    const style = value ? `squares ${value}` : `squares`;

    return (
        <button className={style} onClick={onClick2}>
            {value}
        </button>
    );
};

export default Square;