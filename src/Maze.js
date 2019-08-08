import StringRenderer from "./renderers/String";
import Grid from './models/Grid';
import { COLORIZER_BASE, COLORIZER_GENERATION } from './renderers/colorizers';
import Vec from "./models/Vec";
import { DIR_NAMES } from "./constants";

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

		this.root = Vec.fromRelative(this.config.mazeRoot[0], this.config.mazeRoot[1], this.cols, this.rows);
		this.finish = Vec.fromRelative(this.config.mazeFinish[0], this.config.mazeFinish[1], this.cols, this.rows);

		this.generation = {
			current: [],
			inProgress: false,
			done: false
		}
	}

	init() {
		this.grid.init();
		this.grid.setRoot(this.root);
		this.grid.setFinish(this.finish);
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

		this.renderer.setColorizer(COLORIZER_BASE);
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

		this.renderer.setColorizer(COLORIZER_GENERATION);
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