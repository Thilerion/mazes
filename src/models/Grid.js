import Cell from "./Cell";
import { dirVectors } from '../utils';
import { DIR_NAMES, WALL_CORNER, WALL_H, WALL_V, WALL_OPEN, PASSAGE_BLOCKED, PASSAGE_OPEN } from '../constants';

export default class Grid {
	constructor({cols, rows, config}) {
		this.cols = cols;
		this.rows = rows;

		this.config = config;
		
		this.grid = null;
	}

	init() {
		this.createEmptyGrid().configureNeighbors();
		return this;
	}

	createEmptyGrid() {
		this.grid = [];
		for (let y = 0; y < this.rows; y++) {
			const row = [];
			for (let x = 0; x < this.cols; x++) {
				row.push(new Cell({ x, y }));
			}
			this.grid.push(row);
		}
		return this;
	}

	setRoot(vec) {
		this.grid[vec.y][vec.x].isRoot = true;
	}
	setFinish(vec) {
		this.grid[vec.y][vec.x].isFinish = true;
	}

	configureNeighbors() {
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				const cell = this.grid[y][x];

				Object.keys(dirVectors).forEach(dirName => {
					const vec = dirVectors[dirName].plus(cell.pos);
					if (this.isInside(vec)) {
						cell.setNeighbor(this.grid[vec.y][vec.x], dirName);
					}
				})
			}
		}
		return this;
	}



	isInside(vec) {
		const { x, y } = vec;
		return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
	}

	toCellParts(useBlockedCell = false) {
		let output = [];
		for (let y = 0; y < this.rows; y++) {
			let top = [], body = [], bottom = [];

			for (let x = 0; x < this.cols; x++) {
				const inclTop = y === 0;
				const inclLeft = x === 0;
				const walls = this.grid[y][x].walls;

				if (inclTop && inclLeft) {
					top.push(WALL_CORNER);
				}
				if (inclTop) {
					if (walls.includes(DIR_NAMES.N)) {
						top.push(WALL_H);
					} else top.push(WALL_OPEN);
					top.push(WALL_CORNER);
				}
				if (inclLeft) {
					if (walls.includes(DIR_NAMES.W)) {
						body.push(WALL_V);
					} else body.push(WALL_OPEN);
					bottom.push(WALL_CORNER);
				}

				if (walls.length === 4 && useBlockedCell) {
					body.push(PASSAGE_BLOCKED);
				} else body.push(PASSAGE_OPEN);

				if (walls.includes(DIR_NAMES.S)) {
					bottom.push(WALL_H);
				} else bottom.push(WALL_OPEN);

				if (walls.includes(DIR_NAMES.E)) {
					body.push(WALL_V);
				} else body.push(WALL_OPEN);
				
				bottom.push(WALL_CORNER);
			}

			if (top.length > 0) {
				output.push(top);
			}
			output.push(body, bottom);
		}
		return output;
	}

	forEachCell(cb) {
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[y].length; x++) {
				cb(this.grid[y][x], x, y);
			}
		}
	}
}