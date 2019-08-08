import CanvasRenderer from './renderers/Canvas';
import Maze from './Maze';
import config from './config';

import * as Generator from './generators';

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: CanvasRenderer,
	config,
	canvas
}).init().render();

maze.generateMaze(Generator.sidewinder);