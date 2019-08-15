export const DIR_NAMES = {
	N: "NORTH",
	S: "SOUTH",
	E: "EAST",
	W: "WEST"
}

export const WALL_CORNER = "*";
export const WALL_H = "-";
export const WALL_V = "|";
export const WALL_OPEN = "=";
export const PASSAGE_OPEN = " ";
export const PASSAGE_BLOCKED = "#";

export const CLOSED_PARTS = [WALL_CORNER, WALL_H, WALL_V, PASSAGE_BLOCKED];
export const OPEN_PARTS = [WALL_OPEN, PASSAGE_OPEN];

export const STATE_EMPTY = "empty"; // grid created, maze not generated
export const STATE_GENERATING = "generating"; // maze is being generated
export const STATE_BASE = "base"; // maze is done generating
export const STATE_SOLVING = "solving"; // maze is currently solving with a specified algorithm

export const WALLS_SOUTH = "SOUTH";
export const WALLS_EAST = "EAST";
export const WALLS_SOUTHEAST = "SOUTHEAST";
export const WALLS_NONE = "NO WALLS";