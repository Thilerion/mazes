import { DIR_NAMES } from "../../constants";

export const createWallPath = (cellX, cellY, wallDir, cellSize, wallSize, ctx) => {
	const strokeSize = wallSize / 2;

	let valueFn;
	if (wallDir === DIR_NAMES.E) {
		valueFn = getEastWallDrawValues;
	} else if (wallDir === DIR_NAMES.S) {
		valueFn = getSouthWallDrawValues;
	} else {
		return;
	}

	const { x0, x1, y0, y1 } = valueFn(cellX, cellY, cellSize, strokeSize);

	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
}

export const removeWall = (cellX, cellY, toRemove = [], toKeep = [], cellSize, wallSize, ctx) => {
	// if toKeep is empty, remove entire rect
	// else if toKeep has one wall and toRemove another,
	// remove the wall but keep the connecting corner
	const { x0: x, y0: y, w, h } = getWallRect(cellX, cellY, cellSize, wallSize, DIR_NAMES.S, true);
}

const getWallRect = (cellX, cellY, cellSize, wallSize, wallDir, includeCorner = true) => {
	let x0, y0, x1, y1, w, h;
	if (wallDir === DIR_NAMES.S) {
		x0 = cellX;
		y0 = cellY + cellSize - wallSize;
		x1 = cellX + cellSize;
		if (!includeCorner) x1 -= wallSize;
		y1 = cellY + cellSize;
	} else if (wallDir === DIR_NAMES.E) {
		x0 = cellX + cellSize;
		y0 = cellY;
		x1 = cellX + cellSize + wallSize;
		y1 = cellY + cellSize;
		if (!includeCorner) y1 -= wallSize;
	}

	let w = x1 - x0;
	let h = y1 - y0;
	return { x0, x1, y0, y1, w, h };
}

const getSouthWallDrawValues = (cellX, cellY, cellSize, strokeSize) => {
	const x0 = cellX;
	const y0 = cellY + cellSize - strokeSize;
	const x1 = cellX + cellSize;
	const y1 = y0;
	return { x0, y0, x1, y1 };
}

const getEastWallDrawValues = (cellX, cellY, cellSize, strokeSize) => {
	const x0 = cellX + cellSize - strokeSize;
	const y0 = cellY;
	const x1 = x0;
	const y1 = cellY + cellSize;
	return { x0, y0, x1, y1 };
}