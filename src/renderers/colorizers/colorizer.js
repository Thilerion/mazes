import { STATE_GENERATING, STATE_BASE } from "../../constants";

export default class Colorizer {
	constructor(Maze) {
		this.colors = Maze.config.colors;
		this.colorSettings = Maze.config.colorSettings;

		this.state = null;
		this.data = {};
	}

	getCellColor(cell) {
		if (this.state === STATE_GENERATING) {
			if (this.data.currentCells.includes(cell)) {
				return this.colors.generation.currentCell;
			}
			if (!cell.initialized) {
				return this.colors.generation.unvisitedCell;
			}
		}
		if (this.state === STATE_BASE) {
			if (cell.isFinish && this.colorSettings.showFinish) {
				return this.colors.finishCell;
			}
			if (cell.isRoot && this.colorSettings.showRoot) {
				return this.colors.rootCell;
			}
		}
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