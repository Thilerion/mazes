import StringRenderer from "./renderers/String";
import Grid from './models/Grid';
import { Colorizer, GenerationColorizer } from './renderers/colorizers';

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

		this.generation = {
			current: [],
			inProgress: false,
			done: false,
			usingGenerationRenderer: false
		}
	}

	init() {
		this.grid.init().configureNeighbors();
		return this;
	}

	startGeneration() {
		this.generation.current = [];
		this.generation.inProgress = true;
		this.generation.done = false;
	}

	updateGeneration({current = []} = {}) {
		this.generation.current = current;
	}

	finishGeneration() {
		this.generation.current = [];
		this.generation.inProgress = false;
		this.generation.done = true;

		if (this.generation.usingGenerationRenderer) {
			this.generation.usingGenerationRenderer = false;
			this.renderer.colorizer = new Colorizer(this.config.colors);
		}
	}

	generateMaze(generatorFn) {
		const onCycle = (updates) => { 

		};
		const onFinish = (updates) => {
			this.finishGeneration();
			this.update(updates);
		};

		this.startGeneration();

		const generator = generatorFn(this, onCycle, onFinish);
		let done = false;
		while (!done) {
			done = generator.next().done;
		}
	}

	generateMazeVisual(generatorFn) {
		const onCycle = (updates = {}) => {
			this.updateGeneration(updates);
			this.update(updates);
		};
		const onFinish = (updates) => {
			this.finishGeneration();
			this.update(updates);
		};

		this.startGeneration();

		this.renderer.colorizer = new GenerationColorizer(this.config.colors);
		this.generation.usingGenerationRenderer = true;

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

	update(updates = {}) {
		this.stringRenderer.update(this);
		this.renderer.update(this);
		this.render();
	}

	render() {
		this.renderer.render();
		return this;
	}
}