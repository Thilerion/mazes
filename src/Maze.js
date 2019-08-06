import StringRenderer from "./renderers/String";
import Grid from './models/Grid';

export default class Maze {
	constructor({ canvas, config, Renderer }) {
		this.config = config;

		this.canvas = canvas;

		this.width = config.width;
		this.height = config.height;

		this.cellSize = config.cellSize;
		this.wallSize = config.wallSize;

		this.cols = this.width / this.cellSize;
		this.rows = this.height / this.cellSize;
		
		this.grid = new Grid(this);
		this.stringRenderer = new StringRenderer(this);
		this.renderer = new Renderer(this);
	}
}