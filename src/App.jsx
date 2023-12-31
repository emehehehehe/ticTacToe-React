import { useState } from "react";
import confetti from "canvas-confetti";

import { Winner } from "./components/Winner";
import { Table } from "./components/Table";
import { Turn } from "./components/Turn";

import { checkWinner, checkEndGame } from "./logic/board";
import { TURNS } from "./constants";
import { saveGameStorage, resetGameStorage } from "./logic/storage";

function App() {
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem("board");
		if (boardFromStorage) return JSON.parse(boardFromStorage);
		return Array(9).fill(null);
	});

	const [turn, setTurn] = useState(() => {
		const turnFromStorage = window.localStorage.getItem("turn");
		return turnFromStorage ?? TURNS.X;
	});
	const [winner, setWinner] = useState(null);

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);

		resetGameStorage();
	};

	const updateBoard = (index) => {
		if (board[index] || winner) return;
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);

		saveGameStorage({
			turn: newTurn,
			board: newBoard,
		});

		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			confetti();
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	};

	return (
		<main className="board">
			<h1>Tic Tac Toe</h1>
			<Table board={board} updateBoard={updateBoard} />
			<Turn turn={turn} />
			<button onClick={resetGame}>Reset Game</button>
			<Winner winner={winner} resetGame={resetGame} />
		</main>
	);
}

export default App;
