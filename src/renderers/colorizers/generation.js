import Colorizer from './base';

export default class ColorizerGeneration extends Colorizer {
	constructor(colors) {
		super(colors);

		this.currentCell = colors.generation.currentCell;
		this.unvisitedCell = colors.generation.unvisitedCell;

		this.currentCells = [];
	}

	getCellColor(cell, grid) {
		if (this.currentCells.includes(cell)) {
			return this.currentCell;
		}
		if (!cell.initialized) {
			return this.unvisitedCell;
		}

		return super.getCellColor(cell, grid);
	}
}