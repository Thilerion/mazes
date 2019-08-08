import { showCurrentCell, showUnvisitedCell, showFinishCell, showRootCell, showDistanceColor } from './cells';

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

		if (showDistanceColor(cell, this)) return this.getDistanceColor(cell);

		if (showFinishCell(cell, this)) return this.colors.finishCell;
		if (showRootCell(cell, this)) return this.colors.rootCell;

		return this.colors.passage;
	}

	getDistanceColor(cell) {
		const maxDistance = Math.max(...this.data.distanceMap.values());
		const p = this.data.distanceMap.get(cell) / maxDistance;

		const h = p * 300;
		console.log(h);
		return `hsl(${h}, 100%, 50%)`;
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