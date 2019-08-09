import CanvasRenderer from './renderers/Canvas';
import Canvas2Renderer from './renderers/Canvas2';
import Maze from './Maze';
import config from './config';
import analyzers from './analyze';

import * as Generator from './generators';

import DistanceSolver from './solvers/distance';

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: Canvas2Renderer,
	analyzers,
	config,
	canvas
}).init().render();

maze.generateMaze(Generator.huntAndKill);

// maze.solveMazeVisual(DistanceSolver);