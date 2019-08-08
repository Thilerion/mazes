import { DIR_NAMES } from "../constants";

const RENDER_WALLS = [DIR_NAMES.E, DIR_NAMES.S];

// Slightly less efficient renderer than standard CanvasRenderer
// However, is easier to work with for coloring individual cells and 
//		adding text or other visuals to cells and walls.
export default class Canvas2Renderer {
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

		this.colors = this.config.colors;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	init() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		return this;
	}

	render() {
		this.renderBackground();

		for (let y = 0; y < this.rows; y++) {

			for (let x = 0; x < this.cols; x++) {
				this.renderCell(x, y);
			}
		}
	}

	renderBackground() {
		this.ctx.fillStyle = this.colors.background;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	renderCell(x, y) {
		const cell = this.grid.grid[y][x];
		const walls = cell.walls;

		const originX = x * this.cellSize + this.wallSize;
		const originY = y * this.cellSize + this.wallSize;

		this.ctx.fillStyle = this.colors.passage;
		this.ctx.fillRect(originX, originY, this.cellSize, this.cellSize);

		walls.forEach(w => this.renderWall(originX, originY, w));
	}

	renderWall(cellX, cellY, wall) {
		if (!RENDER_WALLS.includes(wall)) {
			return;
		}

		let x, y, w, h;

		if (wall === DIR_NAMES.S) {
			x = cellX - this.wallSize;
			y = cellY + this.passageSize;
			w = this.cellSize + this.wallSize;
			h = this.wallSize;
		} else if (wall === DIR_NAMES.E) {
			x = cellX + this.passageSize;
			y = cellY - this.wallSize;
			w = this.wallSize;
			h = this.cellSize + this.wallSize;
		}

		this.ctx.fillStyle = this.colors.wall;
		this.ctx.fillRect(x, y, w, h);
	}

	update({grid}) {
		this.grid = grid;
	}
}