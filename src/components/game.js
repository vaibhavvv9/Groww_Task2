import React, { useState } from "react";
import { get_winner } from "./winner";
import Board from "./board";
import useWindowSize from "../utils/useWindowSize";
const Game = () => {

    const { width } = useWindowSize();
    const [historyOfMoves, setHistoryOfMoves] = useState([null, null, null, null, null, null, null, null, null]);
    const [stepNumber, setStepNumber] = useState(-1);


    const getStatusOfBoard = () => {
        let boardStatus = [null, null, null, null, null, null, null, null, null];

        for (let i = 0; i <= stepNumber; i++) {
            i % 2 !== 0 ? boardStatus[historyOfMoves[i]] = 'O' : boardStatus[historyOfMoves[i]] = 'X';
        }

        return boardStatus;
    }


    const winner = get_winner(getStatusOfBoard());
    const player_turn = stepNumber % 2 ? "X" : "O";

    const handleClick = (i) => {

        const historyPoint = historyOfMoves.slice(0, stepNumber + 1);
        const moveInHistory = historyPoint.indexOf(i);

        if (winner || moveInHistory !== -1)
            return;

        var copyOfHistoryMoves = historyOfMoves;
        copyOfHistoryMoves[stepNumber + 1] = i;

        for (let index = stepNumber + 2; index < 9; index++) {
            copyOfHistoryMoves[index] = null;
        }

        setHistoryOfMoves(copyOfHistoryMoves);
        setStepNumber(stepNumber + 1);
    };



    const jumpTo = (step) => {
        setStepNumber(step);
    };

    const renderMoves = () =>
        historyOfMoves.filter(value => value != null).map((value, idx) => {
            return (
                <li key={idx}>
                    <button onClick={() => jumpTo(idx)}>Move #{idx + 1}</button>
                </li>
            )
        })
    const boardhistoryStyle = {
        display: width > 768 ? "flex" : "block", width: "100%", height: "100vh"
    }
    const historyStyling = {
        width: width > 768 ? "50%" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    }
    const board_and_header_styling = {
        width: width > 768 ? "50%" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
    return (

        <div className="board_history" style={boardhistoryStyle}>
            <div className="board_and_header"
                style={board_and_header_styling}>

                <h1>Tic Tac Toe </h1>
                <Board squares={getStatusOfBoard()} onClick={handleClick} />
                <h3>
                    {
                        winner ? <span className="game_status">Winner:  {winner}</span>
                            : stepNumber !== 8 ? ("Next Player: " + player_turn)
                                : <span className="game_status">Game Ends in a Draw</span>
                    }
                </h3>
            </div>
            <div className="info-wrapper"
                style={historyStyling}>
                <h2>History</h2>

                <div className="history_button" >
                    <li>
                        <button onClick={() => jumpTo(-1)}>Game On</button>
                    </li>
                    {renderMoves()}
                </div>
            </div>
        </div >

    );
};

export default Game;