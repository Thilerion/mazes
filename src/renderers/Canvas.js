import { WALL_CORNER, WALL_H, WALL_V, PASSAGE_BLOCKED, PASSAGE_OPEN, WALL_OPEN, CLOSED_PARTS, OPEN_PARTS } from '../constants';

export default class CanvasRenderer {
	constructor({ grid, config, canvas, width, height, cols, rows, wallSize, cellSize }) {
		this.grid = grid;
		this.config = config;

		this.width = width;
		this.height = height;

		this.cols = cols;
		this.rows = rows;

		this.wallSize = wallSize;
		this.cellSize = cellSize;
		this.passageSize = cellSize - wallSize;

		this.colorWall = config.colors.wall;
		this.colorPassage = config.colors.passage;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	init() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		return this;
	}

	render() {
		const cellParts = this.grid.toCellParts(false);

		console.log(cellParts);

		for (let i = 0; i < cellParts.length; i++) {
			for (let j = 0; j < cellParts[i].length; j++) {

				// (0 1 2 3 4)
				// (|, ,|, ,|)
				// uneven = passage
				// even = wall

				const [cellX, cellY] = this.getCellCoords(j, i);

				let x = cellX * this.cellSize;
				let y = cellY * this.cellSize;

				const { w, h } = this.getPartSize(j, i);

				if (w === this.passageSize) x += this.wallSize;
				if (h === this.passageSize) y += this.wallSize;

				const color = this.getCellPartColor(cellParts[i][j]);

				this.ctx.fillStyle = color;
				this.ctx.fillRect(x, y, w, h);
			}
		}
	}

	getCellCoords(partX, partY) {
		const x = Math.floor(partX / 2);
		const y = Math.floor(partY / 2);
		return [x, y];
	}

	getPartSize(j, i) {
		let w, h;
		if (j % 2 === 0) {
			// left edge
			w = this.wallSize;
		} else w = this.passageSize;

		if (i % 2 === 0) {
			// top edge
			h = this.wallSize;
		} else h = this.passageSize;
		return { w, h };
	}

	getCellPartColor(type) {
		if (CLOSED_PARTS.includes(type)) {
			return this.colorWall;
		} else if (OPEN_PARTS.includes(type)) {
			return this.colorPassage;
		} else {
			console.warn("Unrecognized maze type.");
			return "red";
		}
	}

	update({ grid, config }) {
		this.grid = grid;
		this.config = config;
	}
}