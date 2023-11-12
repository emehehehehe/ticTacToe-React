export const TURNS = {
	X: "x",
	O: "o",
};

export const WINNER_COMBOS = [
	// Row
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// Colums
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// Diagonal
	[0, 4, 8],
	[2, 4, 6],
];
