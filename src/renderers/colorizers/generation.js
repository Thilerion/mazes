import Colorizer from './base';
import { objectIsCellInstance } from '../../utils';

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

		return this.passage;
	}

	update(Maze) {
		try {
			const cells = Maze.generation.current;
			if (Array.isArray(cells)) {
				this.currentCells = cells;
			} else if (objectIsCellInstance(cells)) {
				this.currentCells = [cells];
			}
		} catch {
			this.currentCells = [];
		}
	}
}