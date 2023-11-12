import { Square } from "./Square";

export function Winner({ winner, resetGame }) {
	if (winner === null) return null;

	const winnerText = winner === false ? "Tied" : "Wins";

	return (
		<section className="winner">
			<div className="text">
				<h2>{winnerText}</h2>
				<header className="win">{winner && <Square>{winner}</Square>}</header>
				<footer>
					<button onClick={resetGame}>Start again</button>
				</footer>
			</div>
		</section>
	);
}
