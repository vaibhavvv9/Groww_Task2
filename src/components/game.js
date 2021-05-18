import React, { useState } from "react";
import { get_winner } from "./winner";
import Board from "./board";

const Game = () => {


    const [history, setHistory] = useState([Array(9).fill(null)]);
    //A 2d array which contains the each movement of each square history[i][j] means status of jth square in ith move
    const [stepNumber, setStepNumber] = useState(0);
    // Stores how many steps i have completed
    const [xIsNext, setXisNext] = useState(true);
    //predict the chance of next player
    const winner = get_winner(history[stepNumber]);
    // takes 1d array as input upto ith move and return true if winner is decided
    const player_turn = xIsNext ? "X" : "O";
    // Chance of a player
    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        // slices the move upto 0 to ith move(used in reversing the step)
        const current = historyPoint[stepNumber];
        // 1d aray which tells the status till ith move
        const squares = [...current];



        // return if won or occupied
        if (winner || squares[i]) return;
        // select square


        squares[i] = player_turn;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);

    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);

    };

    const renderMoves = () =>
        history.map((_step, move) => {
            const destination = move ? `Move #${move}` : "Let's Start";
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        });

    return (

        <div className="board_history" style={{ display: "flex", width: "100%", height: "100vh" }}>
            <div className="board_and_header"
                style={{ width: "50%" }}>
                <h1>Tic Tac Toe </h1>

                <Board squares={history[stepNumber]}
                    onClick1={handleClick} />
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
                <div className="history_button">

                    {renderMoves()}
                </div>
            </div>
        </div>
    );
};

export default Game;