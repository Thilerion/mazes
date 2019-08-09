import { DIR_NAMES } from "../constants";

import Colorizer from './colorizers/colorizer';

const RENDER_WALLS = [DIR_NAMES.E, DIR_NAMES.S];

// Slightly less efficient renderer than standard CanvasRenderer
// However, is easier to work with for coloring individual cells and 
//		adding text or other visuals to cells and walls.
export default class Canvas2Renderer {
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
		this.renderBackground();

		for (let y = 0; y < this.rows; y++) {

			for (let x = 0; x < this.cols; x++) {
				this.renderCell(x, y);
			}
		}
	}

	renderBackground() {
		this.ctx.fillStyle = this.colorizer.getBackgroundColor();
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	renderCell(x, y) {
		const cell = this.grid.grid[y][x];
		const walls = cell.walls;

		const originX = x * this.cellSize + this.wallSize;
		const originY = y * this.cellSize + this.wallSize;

		this.ctx.fillStyle = this.colorizer.getCellColor(cell, this.grid);
		this.ctx.fillRect(originX, originY, this.cellSize, this.cellSize);

		this.renderCellOverlay(cell, originX, originY, this.cellSize);

		walls.forEach(w => this.renderWall(originX, originY, w));
	}

	renderCellOverlay(cell, x, y, size) {
		const overlayColor = this.colorizer.getCellOverlayColor(cell);
		if (!overlayColor) {
			return;
		}
		this.ctx.fillStyle = overlayColor;
		this.ctx.fillRect(x, y, size, size);
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

		this.ctx.fillStyle = this.colorizer.getWallColor();
		this.ctx.fillRect(x, y, w, h);
	}

	update(Maze) {
		this.grid = Maze.grid;
		this.colorizer.update(Maze);
	}
}