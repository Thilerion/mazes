import Cell from "./Cell";
import { dirVectors } from '../utils';
import { DIR_NAMES } from '../constants';

export default class Grid {
	constructor({ cols, rows, config }) {
		this.cols = cols;
		this.rows = rows;

		this.config = config;
		
		this.grid = null;
	}

	init() {
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

	toString() {
		let output = '';
		for (let y = 0; y < this.rows; y++) {

			let top = '';
			let body = '';
			let bottom = '';

			for (let x = 0; x < this.cols; x++) {
				const includeTop = y === 0;
				const includeLeft = x === 0;
				const cell = this.grid[y][x];
				const walls = cell.walls;

				if (includeTop && includeLeft) {
					top += '*';
				}
				if (includeTop) {
					// if top wall
					if (walls.includes(DIR_NAMES.N)) {
						top += '---';
					} else {
						top += '   ';
					}
					top += '*';
				}
				if (includeLeft) {
					// if left wall
					if (walls.includes(DIR_NAMES.W)) {
						body += '|';
					} else {
						body += ' ';
					}
					bottom += '*';
				}

				body += '   ';

				// if bottom wall
				if (walls.includes(DIR_NAMES.S)) {
					bottom += '---';
				} else {
					bottom += '   ';
				}

				// if right wall
				if (walls.includes(DIR_NAMES.E)) {
					body += '|';
				} else {
					body += ' ';
				}
				bottom += '*';
			}
			const add = `${top}\n${body}\n${bottom}`;
			output += add;
		}
		console.log(output);
		return output;
	}
}