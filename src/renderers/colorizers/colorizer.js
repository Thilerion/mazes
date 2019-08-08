import { showCurrentCell, showUnvisitedCell, showFinishCell, showRootCell } from './cells';

export default class Colorizer {
	constructor(Maze) {
		this.colors = Maze.config.colors;
		this.colorSettings = Maze.config.colorSettings;

		this.state = null;
		this.data = {};
	}

	getCellColor(cell) {
		if (showCurrentCell(cell, this)) return this.colors.generation.currentCell;
		if (showUnvisitedCell(cell, this)) return this.colors.generation.unvisitedCell;
		if (showFinishCell(cell, this)) return this.colors.finishCell;
		if (showRootCell(cell, this)) return this.colors.rootCell;

		return this.colors.passage;
	}

	getWallColor() {

		return this.colors.wall;
	}

	getBackgroundColor() {

		return this.colors.background;
	}

	update(Maze) {
		const { renderData, state, config } = Maze;
		
		this.state = state;
		this.data = renderData;
		
		this.colors = config.colors;
		this.colorSettings = config.colorSettings;
	}
}