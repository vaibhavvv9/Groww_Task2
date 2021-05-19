import React, { useState } from "react";
import { get_winner } from "./winner";
import Board from "./board";

const Game = () => {


    const [myHistory, setMyHistory] = useState([null, null, null, null, null, null, null, null, null]);
    const [stepNumber, setStepNumber] = useState(-1);
    const [xIsNext, setXisNext] = useState(true);
    const getBoard = () => {
        let board = [null, null, null, null, null, null, null, null, null];

        for (let i = 0; i <= stepNumber; i++) {
            i % 2 !== 0 ? board[myHistory[i]] = 'O' : board[myHistory[i]] = 'X';
        }

        return board;
    }


    const winner = get_winner(getBoard());
    const player_turn = stepNumber % 2 ? "X" : "O";

    const handleClick = (i) => {

        const historyPoint = myHistory.slice(0, stepNumber + 1);
        const idx = historyPoint.indexOf(i);

        if (winner || idx !== -1)
            return;

        var newMyHistory = myHistory;
        newMyHistory[stepNumber + 1] = i;

        for (let index = stepNumber + 2; index < 9; index++) {
            newMyHistory[index] = null;
        }

        setMyHistory(newMyHistory);
        setStepNumber(stepNumber + 1);
        setXisNext(!xIsNext);
    };



    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);

    };

    const renderMoves = () =>
        myHistory.filter(value => value != null).map((value, idx) => {
            return (
                <li key={idx}>
                    <button onClick={() => jumpTo(idx)}>Move #{idx + 1}</button>
                </li>
            )
        })

    return (

        <div className="board_history" style={{ display: "flex", width: "100%", height: "100vh" }}>
            <div className="board_and_header"
                style={{ width: "50%" }}>

                <h1>Tic Tac Toe </h1>
                <Board squares={getBoard()} onClick={handleClick} />
                <h3>
                    {
                        winner ? ("Winner: " + winner) : stepNumber !== 8 ? ("Next Player: " + player_turn) : ("Game Ends in a Draw")
                    }
                </h3>
            </div>
            <div className="info-wrapper" style={{ textAlign: "center", width: "50%" }}>
                <h2 style={{ width: "100%" }}>History</h2>
                <br />
                <div className="history_button">
                    <li>
                        <button onClick={() => jumpTo(-1)}>Let's start</button>
                    </li>
                    {renderMoves()}
                </div>
            </div>
        </div>
    );
};

export default Game;