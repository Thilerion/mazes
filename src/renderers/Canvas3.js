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
		this.renderedObjects.cells = this.initCells();

		return this;
	}

	initWalls() {
		const wallsMap = new Map();

		this.grid.forEachCell((cell, x, y) => {
			wallsMap.set(cell, WALLS_NONE);
		})
		return wallsMap;
	}

	initCells() {
		const cellsMap = new Map();

		this.grid.forEachCell((cell, x, y) => {
			cellsMap.set(cell, null);
		})
		return cellsMap;
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

	getAllCells() {
		const cellsMap = new Map();

		this.grid.forEachCell((cell, x, y) => {
			cellsMap.set(cell, this.colorizer.getCellColor(cell));
		})
		return cellsMap;
	}

	getCellChanges(updated, old) {
		const changes = new Map();
		for (let [cell, color] of updated) {
			const oldColor = old.get(cell);
			if (oldColor !== color) {
				changes.set(cell, color);
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

		const updatedCells = this.getAllCells();
		const oldCells = this.renderedObjects.cells;
		const changedCells = this.getCellChanges(updatedCells, oldCells);

		this.renderCellChanges(changedCells);

		this.renderedObjects.cells = updatedCells;
	}

	renderWallChanges(color, changes) {		
		const wallSize = this.wallSize / 2;
		const ctx = this.wallCtx;
		ctx.strokeStyle = color;
		ctx.lineWidth = this.wallSize;
		ctx.lineCap = "square";
		ctx.beginPath();

		ctx.moveTo(wallSize, this.height);
		ctx.lineTo(wallSize, wallSize);
		ctx.lineTo(this.width, wallSize);

		for (let i = 0; i < changes.length; i++) {
			const cell = changes[i];
			const walls = cell.walls;
			const { x: originX, y: originY } = this.getCellOrigin(cell.x, cell.y);

			let keepCorner = false;
			if (cell.neighbors[DIR_NAMES.S]) {
				if (cell.neighbors[DIR_NAMES.S].walls.includes(DIR_NAMES.E)) {
					keepCorner = true;
				}
			}
			if (!keepCorner && cell.neighbors[DIR_NAMES.E]) {
				if (cell.neighbors[DIR_NAMES.E].walls.includes(DIR_NAMES.S)) {
					keepCorner = true;
				}
			}

			ctx.clearRect(originX, originY, this.cellSize, this.cellSize);
			if (keepCorner) {
				ctx.fillStyle = color;
				ctx.fillRect(originX + this.passageSize, originY + this.passageSize, this.wallSize, this.wallSize);
			}

			walls.forEach(w => this.createWallLine(originX, originY, w, wallSize, ctx));
		}

		ctx.stroke();
	}

	renderCellChanges(changed) {
		for (let [cell, color] of changed) {
			const { x, y } = this.getCellOrigin(cell.x, cell.y);
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
		}
	}

	getCellOrigin(col, row) {
		return {
			x: col * this.cellSize + this.wallSize,
			y: row * this.cellSize + this.wallSize
		}
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