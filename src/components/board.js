import React from "react";
import Square from "./square";

const Board = ({ squares, onClick1 }) => (
    <div className="board">
        {squares.map((square, i) => (
            <Square key={i}
                value={square}
                onClick2={() => onClick1(i)} />
        ))}
    </div>
);

export default Board;

