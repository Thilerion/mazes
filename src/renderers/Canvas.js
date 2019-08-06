import { WALL_CORNER, WALL_H, WALL_V, PASSAGE_BLOCKED, PASSAGE_OPEN, WALL_OPEN } from '../constants';

export default class CanvasRenderer {
	constructor({ grid, config, canvas, width, height, cols, rows }) {
		this.grid = grid;
		this.config = config;

		this.width = width;
		this.height = height;

		this.cols = cols;
		this.rows = rows;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	init() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		return this;
	}

	render() {

	}

	update({ grid, config }) {
		this.grid = grid;
		this.config = config;
	}
}