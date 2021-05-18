import React, { useState } from "react";
import { get_winner } from "./winner";
import Board from "./board";

const Game = () => {

    const [currentboard, setCurrentBoard] = useState([null, null, null, null, null, null, null, null, null]);
    const [history, setHistory] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = get_winner(currentboard);
    const player_turn = xIsNext ? "X" : "O";


    function handleClick(i) {
        // const historyPoint = history.slice(0, stepNumber + 1);
        console.log(i);
        const squares = [...currentboard];
        if (winner || currentboard[i])
            return;

        var temp = stepNumber + 1;
        setCurrentBoard(currentboard[i] = player_turn);
        setStepNumber(temp);
        setXisNext(!xIsNext);
        console.log(currentboard);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);

    };

    // const renderMoves = () =>
    //     <button onClick={() => jumpTo(0)}>"Let's Start"</button>

    // history.map((move) => (
    //     <button onClick={() => jumpTo(move)}>Move #{move} </button>
    // ));

    return (

        <div className="board_history" style={{ display: "flex", width: "100%", height: "100vh" }}>
            <div className="board_and_header"
                style={{ width: "50%" }}>
                <h1>Tic Tac Toe </h1>
                <div className="board">
                    {
                        currentboard.map((value, index) => (
                            <button key={index} className="squares" onClick={() => handleClick(index)}>
                                {value}
                            </button>
                        ))}
                </div>

                <h3>

                    {

                        winner ? ("Winner: " + winner) : `${stepNumber}` != 9 ? ("Next Player: " + player_turn) : ("Game Ends in a Draw")
                    }
                </h3>
            </div>
            <div className="info-wrapper"
                style={{ textAlign: "center", width: "50%" }}>
                <h2 style={{ width: "100%" }}>History</h2>
                <br />
                {/* <div className="history_button">

                    {renderMoves()}
                </div> */}
            </div>
        </div>
    );
};

export default Game;