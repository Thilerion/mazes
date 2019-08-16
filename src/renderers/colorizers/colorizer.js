import { showCurrentCell, showUnvisitedCell, showFinishCell, showRootCell, showDistanceColor, showHuntAndKillRowCell, showInStackCell } from './cells';

export default class Colorizer {
	constructor(Maze) {
		this.colors = Maze.config.colors;
		this.colorSettings = Maze.config.colorSettings;

		this.state = null;
		this.data = {};
	}

	getCellColor(cell) {
		if (showInStackCell(cell, this)) return this.colors.generation.recursiveInStackCells;
		if (showCurrentCell(cell, this)) return this.colors.generation.currentCell;
		if (showUnvisitedCell(cell, this)) return this.colors.generation.unvisitedCell;

		if (showDistanceColor(cell, this)) return this.getDistanceColor(cell);

		if (showFinishCell(cell, this)) return this.colors.finishCell;
		if (showRootCell(cell, this)) return this.colors.rootCell;

		return this.colors.passage;
	}

	getCellOverlayColor(cell) {
		if (showHuntAndKillRowCell(cell, this)) return this.colors.generation.huntAndKillRow;

		return null;
	}

	getDistanceColor(cell) {
		const minimumScale = (this.data.cols + this.data.rows) * 1.5; // to prevent huge color changes in the beginning
		const maxDistance = this.data.distanceRange;

		const scaleSize = Math.ceil(Math.max(maxDistance, minimumScale));

		const p = this.data.distanceMap.get(cell) / scaleSize;

		const h = Math.round((-p * 190 + 140) % 360);
		return `hsl(${h}, 80%, 50%)`;
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