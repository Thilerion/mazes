import Grid from './models/Grid';
import Vec from "./models/Vec";
import { STATE_BASE, STATE_EMPTY, STATE_GENERATING, STATE_SOLVING } from "./constants";

export default class Maze {
	constructor({ canvas, config, Renderer, Analyze, StringRenderer }) {
		this.config = config;

		this.canvas = canvas;

		this.cellSize = config.cellSize;
		this.wallSize = config.wallSize;

		this.cols = config.width / this.cellSize;
		this.rows = config.height / this.cellSize;

		this.width = config.width + this.wallSize;
		this.height = config.height + this.wallSize;
		
		this.grid = new Grid(this).init();
		this.stringRenderer = new StringRenderer(this);
		this.renderer = new Renderer(this).init();
		this.analysis = new Analyze(this.config);

		this.root = Vec.fromRelative(this.config.mazeRoot[0], this.config.mazeRoot[1], this.cols, this.rows);
		this.finish = Vec.fromRelative(this.config.mazeFinish[0], this.config.mazeFinish[1], this.cols, this.rows);

		this.state = STATE_EMPTY;

		this.generation = {
			current: [],
			huntAndKillRow: [],
			inStack: [],
			inProgress: false,
			done: false
		}

		this.solving = {
			current: [],
			values: null,
			distanceRange: null,
			complete: false,
		}
	}

	get renderData() {
		return {
			cols: this.cols,
			rows: this.rows,
			
			cellRoot: this.root,
			cellFinish: this.finish,
			currentCells: this.generation.current,

			huntAndKillRow: this.generation.huntAndKillRow,
			inStack: this.generation.inStack,

			distancesCalculated: this.solving && this.solving.complete,
			distanceMap: this.solving.values,
			distanceRange: this.solving.distanceRange
		}
	}

	init() {
		// this.grid.init();
		this.grid.setRoot(this.root);
		this.grid.setFinish(this.finish);

		// this.distances = new Distances(this.grid.grid[this.root.y][this.root.x]);

		return this;
	}

	startSolving() {
		this.state = STATE_SOLVING;
		this.solving.current = [];
		this.solving.values = new Map();
		this.solving.complete = false;
		this.solving.distanceRange = null;
		// console.time('solve');

	}
	updateSolving({current, values, range} = {}) {
		if (current) {
			this.solving.current = current;
		}
		if (values) {
			this.solving.values = values;
			this.solving.distanceRange = range;
		}
	}
	finishSolving() {
		this.state = STATE_BASE;
		this.solving.current = [];
		this.solving.distanceRange = null;
		this.solving.complete = true;
		// console.timeEnd('solve');
	}

	solveMaze(solverFn) {
		const onCycle = ({ current, values, range }) => {
			
		};
		const onFinish = ({ values, range }) => {
			this.finishSolving();
			this.solving.values = values;
			this.solving.distanceRange = range;
			this.update();
		}

		this.startSolving();

		const rootCell = this.grid.grid[this.root.y][this.root.x];
		const solver = solverFn({ rootCell }, onCycle, onFinish);
		let done = false;
		while (!done) {
			done = solver.next().done;
		}
	}
	solveMazeVisual(solverFn) {
		const onCycle = ({ current, values, range }) => {
			this.updateSolving({ current, values, range });
			this.update();
		};
		const onFinish = ({ values, range }) => {
			this.finishSolving();
			this.solving.values = values;
			this.solving.distanceRange = range;
			this.update();
		}

		this.startSolving();

		const rootCell = this.grid.grid[this.root.y][this.root.x];
		const solver = solverFn({ rootCell }, onCycle, onFinish);
		
		this.solveLoop(solver);
	}
	solveLoop(fn) {
		if (!fn.next().done) {
			const fps = this.config.solverAnimFps;
			if (fps >= 60) {
				requestAnimationFrame(() => this.solveLoop(fn));
			} else {
				setTimeout(() => this.solveLoop(fn), 1000 / fps);
			}
		}
	}

	startGeneration() {
		this.state = STATE_GENERATING;
		this.generation.current = [];
		this.generation.huntAndKillRow = [];
		this.generation.inStack = [];
	}

	updateGeneration({current = [], huntAndKillRow = [], inStack = []} = {}) {
		this.generation.current = current;
		this.generation.huntAndKillRow = huntAndKillRow;
		this.generation.inStack = inStack;
	}

	finishGeneration() {
		this.state = STATE_BASE;
		this.generation.current = [];
		this.generation.huntAndKillRow = [];
		this.generation.inStack = [];

		if (this.config.analyze.performPostAnalysis) {
			this.analysis.postGeneration(this.grid);
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