import { WALL_CORNER, WALL_H, WALL_V, PASSAGE_BLOCKED, PASSAGE_OPEN } from '../constants';

export default class CanvasRenderer {
	constructor({ grid, config, canvas }) {
		this.grid = grid;
		this.config = config;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
	}

	render() {

	}

	update({ grid, config }) {
		this.grid = grid;
		this.config = config;
	}
}