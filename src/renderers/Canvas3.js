import { DIR_NAMES, WALLS_EAST, WALLS_SOUTH, WALLS_SOUTHEAST, WALLS_NONE } from "../constants";
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

		this.wallCanvas = document.getElementById('walls');
		this.wallCtx = this.wallCanvas.getContext('2d');

		this.renderedObjects = {
			walls: new Map(),
			cells: new Map()
		}
		this.initialRender = false;
	}

	init() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.wallCanvas.width = this.width;
		this.wallCanvas.height = this.height;

		const container = document.querySelector('.container');
		container.style.width = `${this.width}px`;
		container.style.height = `${this.height}px`;

		this.renderedObjects.walls = this.initWalls();

		return this;
	}

	initWalls() {
		const wallsMap = new Map();

		this.grid.forEachCell((cell, x, y) => {
			wallsMap.set(cell, WALLS_NONE);
		})
		return wallsMap;
	}

	getAllWalls() {
		const wallsMap = new Map();

		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				const cell = this.grid.grid[y][x];
				const walls = cell.walls;

				if (walls.includes(DIR_NAMES.S)) {
					if (walls.includes(DIR_NAMES.E)) {
						// south and east walls
						wallsMap.set(cell, WALLS_SOUTHEAST);
					} else {
						// only south
						wallsMap.set(cell, WALLS_SOUTH);
					}
				} else if (walls.includes(DIR_NAMES.E)) {
					// only east
					wallsMap.set(cell, WALLS_EAST);
				} else {
					wallsMap.set(cell, null);
				}
			}
		}
		return wallsMap;
	}

	getWallChanges(updated, old) {
		const changes = [];

		for (let [cell, walls] of updated) {
			const oldWalls = old.get(cell);
			if (oldWalls !== walls) {
				changes.push(cell);
			}
		}
		return changes;
	}

	render() {
		if (!this.initialRender) {
			const bgColor = this.colorizer.getBackgroundColor();
			this.ctx.fillStyle = bgColor;
			this.ctx.fillRect(0, 0, this.width, this.height);
			this.initialRender = true;
		}

		const updatedWalls = this.getAllWalls();
		const oldWalls = this.renderedObjects.walls;
		const changedWalls = this.getWallChanges(updatedWalls, oldWalls);

		const wallColor = this.colorizer.getWallColor();
		this.renderWallChanges(wallColor, changedWalls);

		this.renderedObjects.walls = updatedWalls;

		// this.renderWalls(wallColor);
	}

	renderWallChanges(color, changes) {		
		const wallSize = this.wallSize / 2;
		const ctx = this.wallCtx;
		ctx.strokeStyle = color;
		ctx.lineWidth = this.wallSize;
		ctx.lineJoin = "round";
		ctx.lineCap = "square";
		ctx.beginPath();

		ctx.moveTo(wallSize, this.height);
		ctx.lineTo(wallSize, wallSize);
		ctx.lineTo(this.width, wallSize);

		for (let i = 0; i < changes.length; i++) {
			const cell = changes[i];
			const walls = cell.walls;
			const { x: originX, y: originY } = this.getCellOrigin(cell.x, cell.y);

			// TODO: extract to other method, better method for checking
			ctx.clearRect(originX, originY, this.cellSize, this.cellSize);
			try {
				if (this.grid.grid[cell.y][cell.x + 1].walls.includes(DIR_NAMES.S)) {
					ctx.fillStyle = "red";
					ctx.fillRect(originX + this.cellSize - this.wallSize, originY + this.cellSize - this.wallSize, this.wallSize, this.wallSize);
				}
			} catch { }
			try {
				if (this.grid.grid[cell.y + 1][cell.x].walls.includes(DIR_NAMES.E)) {
					ctx.fillStyle = "red";
					ctx.fillRect(originX + this.cellSize - this.wallSize, originY + this.cellSize - this.wallSize, this.wallSize, this.wallSize);
				}
			} catch {}

			walls.forEach(w => this.createWallLine(originX, originY, w, wallSize, ctx));
		}

		ctx.stroke();
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

	removeWall(cellX, cellY, dir, size, ctx) {
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

		ctx.fillStyle = 'rgba(250, 0, 0, 0.2)';
		ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
	}

	createWallLine(cellX, cellY, dir, size, ctx = this.ctx) {
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

		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
	}

	update(Maze) {
		this.grid = Maze.grid;
		this.colorizer.update(Maze);
	}
}