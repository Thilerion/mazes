import CanvasRenderer from './renderers/Canvas';
import Canvas2Renderer from './renderers/Canvas2';
import Canvas3Renderer from './renderers/Canvas3';
import Maze from './Maze';
import config from './config';
import Analyze from './analyze';
import { reseed } from './utils/random';

if (process.env.NODE_ENV === "development") {
	reseed(config.seed);
}

import * as Generator from './generators';

import DistanceSolver from './solvers/distance';

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: Canvas3Renderer,
	Analyze,
	config,
	canvas
}).init().render();

maze.generateMaze(Generator.recursiveBacktracker);
// maze.solveMazeVisual(DistanceSolver);