import React, { useState } from "react";
import { get_winner } from "./winner";
import Board from "./board";

const Game = () => {


    const [myHistory, setMyHistory] = useState([null, null, null, null, null, null, null, null, null]);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    //A 2d array which contains the each movement of each square history[i][j] means status of jth square in ith move
    const [stepNumber, setStepNumber] = useState(-1);
    // Stores how many steps i have completed
    const [xIsNext, setXisNext] = useState(true);
    //predict the chance of next player
    const getBoard = () => {
        let board = [null, null, null, null, null, null, null, null, null];
        var i = 0, chance = 1;
        for (; i <= stepNumber; i++, chance++) {
            if (chance % 2 == 0) {
                board[myHistory[i]] = 'O';
            } else {
                board[myHistory[i]] = 'X';
            }
        }
        return board;
    }


    const winner = get_winner(getBoard());
    // takes 1d array as input upto ith move and return true if winner is decided
    const player_turn = stepNumber === -1 ? "X" : stepNumber % 2 ? "X" : "O";
    // Chance of a player
    const handleClick = (i) => {

        // const historyPoint = history.slice(0, stepNumber + 1);
        // // slices the move upto 0 to ith move(used in reversing the step)
        // const current = historyPoint[stepNumber];
        // // 1d aray which tells the status till ith move
        // const squares = [...current];



        // // return if won or occupied
        const historyPoint = myHistory.slice(0, stepNumber + 1);
        const idx = historyPoint.indexOf(i);
        if (winner || idx != -1) return;
        // // select square
        var newMyHistory = myHistory;
        newMyHistory[stepNumber + 1] = i;
        var index = stepNumber + 2;
        for (; index < 9; index++) {
            newMyHistory[index] = null;
        }
        setMyHistory(newMyHistory);

        // squares[i] = player_turn;
        // setHistory([...historyPoint, squares]);
        setStepNumber(stepNumber + 1);
        setXisNext(!xIsNext);
        // console.log(history);
        // console.log(historyPoint);
        // console.log(stepNumber);
    };

    // const getBoard = () => {
    //     let board = [null, null, null, null, null, null, null, null, null];
    //     var i = 0, chance = 1;
    //     for (; i < stepNumber; i++, chance++) {
    //         if (chance % 2 == 0) {
    //             board[myHistory[i]] = 'O';
    //         } else {
    //             board[myHistory[i]] = 'X';
    //         }
    //     }
    //     return board;
    // }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);

    };

    const renderMoves = () =>
        myHistory.map((value, idx) => {
            if (value != null) {
                console.log("error", value);
                const destination = `Move #${idx + 1}`;
                return (
                    <li key={idx}>
                        <button onClick={() => jumpTo(idx)}>{destination}</button>
                    </li>
                )
            }
        })

    // history.map((_step, move) => {
    //     const destination = move ? `Move #${move}` : "Let's Start";
    //     return (
    //         <li key={move}>
    //             <button onClick={() => jumpTo(move)}>{destination}</button>
    //         </li>
    //     );
    // });

    // console.log("myHistory:", myHistory);
    console.log("stepNumber:", stepNumber);

    return (

        <div className="board_history" style={{ display: "flex", width: "100%", height: "100vh" }}>
            <div className="board_and_header"
                style={{ width: "50%" }}>
                <h1>Tic Tac Toe </h1>

                <Board squares={getBoard()}
                    onClick={handleClick} />
                <h3>

                    {

                        winner ? ("Winner: " + winner) : `${stepNumber}` != 8 ? ("Next Player: " + player_turn) : ("Game Ends in a Draw")
                    }
                </h3>
            </div>
            <div className="info-wrapper"
                style={{ textAlign: "center", width: "50%" }}>
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