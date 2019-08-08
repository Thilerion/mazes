import StringRenderer from "./renderers/String";
import Grid from './models/Grid';
import Vec from "./models/Vec";
import { STATE_BASE, STATE_EMPTY, STATE_GENERATING } from "./constants";

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

		this.state = STATE_EMPTY;

		this.generation = {
			current: [],
			inProgress: false,
			done: false
		}
	}

	get renderData() {
		return {
			cellRoot: this.root,
			cellFinish: this.finish,
			currentCells: this.generation.current
		}
	}

	init() {
		this.grid.init();
		this.grid.setRoot(this.root);
		this.grid.setFinish(this.finish);
		return this;
	}

	startGeneration() {
		this.state = STATE_GENERATING;
		this.generation.current = [];
	}

	updateGeneration({current = []} = {}) {
		this.generation.current = current;
	}

	finishGeneration() {
		this.state = STATE_BASE;
		this.generation.current = [];
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
		this.renderer.update(this);
		this.render();
	}

	render() {
		this.renderer.render();
		return this;
	}
}