export default class Colorizer {
	constructor(colors) {
		this.passage = colors.passage;
		this.wall = colors.wall;
		this.background = colors.background;

		this.rootCell = colors.rootCell;
		this.finishCell = colors.finishCell;

		this.useRootCellColor = colors.useRootCellColor;
		this.useFinishCellColor = colors.useFinishCellColor;
	}

	getCellColor(cell, grid) {
		if (this.useRootCellColor && cell.isRoot) {
			return this.rootCell;
		}
		if (this.useFinishCellColor && cell.isFinish) {
			return this.finishCell;
		}
		return this.passage;
	}

	getWallColor() {
		return this.wall;
	}

	getBackgroundColor() {
		return this.background;
	}

	update(Maze) {

	}
}