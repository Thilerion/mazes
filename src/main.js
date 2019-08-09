import CanvasRenderer from './renderers/Canvas';
import Canvas2Renderer from './renderers/Canvas2';
import Maze from './Maze';
import config from './config';

import * as Generator from './generators';

import DistanceSolver from './solvers/distance';

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: Canvas2Renderer,
	config,
	canvas
}).init().render();

maze.generateMazeVisual(Generator.huntAndKill);

// maze.solveMazeVisual(DistanceSolver);