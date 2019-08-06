import StringRenderer from "./renderers/String";
import Grid from './models/Grid';

export default class Maze {
	constructor({ canvas, config, Renderer }) {
		this.config = config;

		this.canvas = canvas;

		this.cellSize = config.cellSize;
		this.wallSize = config.wallSize;

		this.cols = config.width / this.cellSize;
		this.rows = config.height / this.cellSize;

		this.width = config.width + this.wallSize;
		this.height = config.height + this.wallSize;
		
		this.grid = new Grid(this);
		this.stringRenderer = new StringRenderer(this);
		this.renderer = new Renderer(this).init();
	}

	init() {
		this.grid.init().configureNeighbors();
		return this;
	}

	render() {
		this.renderer.render();
		return this;
	}
}