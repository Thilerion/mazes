import Analyze from './analyze';
import config from './config';
import * as Generator from './generators';
import Maze from './Maze';
import DistanceSolver from './solvers/distance';
import { reseed } from './utils/random';
import * as Renderers from './renderers';

if (process.env.NODE_ENV === "development") {
	reseed(config.seed);
}

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: Renderers.canvasV3,
	StringRenderer: Renderers.toString,
	Analyze,
	config,
	canvas
}).init().render();

maze.generateMaze(Generator.recursiveBacktracker);
maze.solveMazeVisual(DistanceSolver);