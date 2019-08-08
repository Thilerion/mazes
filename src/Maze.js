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

	generateMaze(generatorFn) {
		const onCycle = () => { };
		const onFinish = () => this.update();

		const generator = generatorFn(this, onCycle, onFinish);
		let done = false;
		while (!done) {
			done = generator.next().done;
		}
	}	

	generateMazeVisual(generatorFn) {
		const onCycle = (updates) => this.update(updates);
		const onFinish = (updates) => this.update(updates);

		const generator = generatorFn(this, onCycle, onFinish);
		this.generatorLoop(generator);
	}

	generatorLoop(fn) {
		if (!fn.next().done) {
			const fps = this.config.generatorAnimFps;
			if (fps >= 60) {
				requestAnimationFrame(() => this.generatorLoop(fn));
			} else {
				setTimeout(() => this.generatorLoop(fn), 1000 / fps);
			}
		}
	}

	update() {
		this.stringRenderer.update(this);
		this.renderer.update(this);
		this.render();
	}

	render() {
		this.renderer.render();
		return this;
	}
}