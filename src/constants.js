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