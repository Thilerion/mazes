import { DIR_NAMES } from "../constants";
import Colorizer from './colorizers/colorizer';

const RENDER_WALLS = [DIR_NAMES.E, DIR_NAMES.S];

export default class Canvas3Renderer {
	constructor(Maze) {
		const { grid, config, canvas, width, height, cols, rows, wallSize, cellSize } = Maze;
		this.grid = grid;
		this.config = config;

		this.width = width;
		this.height = height;

		this.cols = cols;
		this.rows = rows;

		this.wallSize = wallSize;
		this.cellSize = cellSize;
		this.passageSize = cellSize - wallSize;
		
		this.colorizer = new Colorizer(Maze);

		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	init() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		return this;
	}

	render() {
		const wallColor = this.colorizer.getWallColor();
		const bgColor = this.colorizer.getBackgroundColor();

		this.ctx.fillStyle = bgColor;
		this.ctx.fillRect(0, 0, this.width, this.height);

		this.renderWalls(wallColor);
	}

	renderWalls(color) {
		const wallAdj = this.wallSize / 2;
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = this.wallSize;
		this.ctx.lineJoin = "round";
		this.ctx.lineCap = "square";
		this.ctx.beginPath();

		// OUTER WALLS - west and north
		this.ctx.moveTo(wallAdj, this.height);
		this.ctx.lineTo(wallAdj, wallAdj);
		this.ctx.lineTo(this.width, wallAdj);

		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				const walls = this.grid.grid[y][x].walls;				
				const { x: originX, y: originY } = this.getCellOrigin(x, y);
				walls.forEach(w => this.createWallLine(originX, originY, w, wallAdj));
			}
		}

		this.ctx.stroke();
	}

	getCellOrigin(col, row) {
		return {
			x: col * this.cellSize + this.wallSize,
			y: row * this.cellSize + this.wallSize
		}
	}

	createWallLine(cellX, cellY, dir, size) {
		if (!RENDER_WALLS.includes(dir)) {
			return;
		}

		let x0 = cellX - (size);
		let y0 = cellY - (size);
		let x1 = cellX - (size);
		let y1 = cellY - (size);

		if (dir === DIR_NAMES.S) {
			x1 += this.cellSize;
			y0 = y1 = y0 + this.cellSize;
		}
		if (dir === DIR_NAMES.E) {
			x0 += this.cellSize;
			x1 = x0;
			y1 += this.cellSize;
		}

		this.ctx.moveTo(x0, y0);
		this.ctx.lineTo(x1, y1);
	}

	update(Maze) {
		this.grid = Maze.grid;
		this.colorizer.update(Maze);
	}
}