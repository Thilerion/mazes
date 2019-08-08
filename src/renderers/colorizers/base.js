export default class Colorizer {
	constructor(colors) {
		this.passage = colors.passage;
		this.wall = colors.wall;
		this.background = colors.background;
	}

	getCellColor(cell, grid) {
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