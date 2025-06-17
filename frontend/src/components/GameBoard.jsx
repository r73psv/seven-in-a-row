import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import "./GameBoard.css";
import { calculateAIMove } from "../utils/ai";

function GameBoard() {
    const [board, setBoard] = useState(Array(9).fill().map(() => Array(11).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [mode, setMode] = useState("multiplayer"); // multiplayer or single

    useEffect(() => {
        // Подписка на WebSocket
    }, []);

    const handleClick = (col) => {
        const newBoard = board.map(row => [...row]);
        for (let row = 8; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentPlayer;
                break;
            }
        }

        if (checkWin(newBoard, currentPlayer)) {
            alert(`${currentPlayer} победил!`);
            resetGame();
            return;
        }

        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

        if (mode === "single" && currentPlayer === "X") {
            setTimeout(() => {
                const aiCol = calculateAIMove(newBoard, "O");
                handleClick(aiCol);
            }, 500);
        }
    };

    const checkWin = (board, piece) => {
        // Реализация проверки победы
        return false;
    };

    const resetGame = () => {
        setBoard(Array(9).fill().map(() => Array(11).fill(null)));
        setCurrentPlayer("X");
    };

    return (
        <div className="game-board">
            {board.map((row, i) => (
                <div key={i} className="row">
                    {row.map((cell, j) => (
                        <Cell key={j} value={cell} onClick={() => handleClick(j)} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GameBoard;
