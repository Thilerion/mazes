import CanvasRenderer from './renderers/Canvas';
import Maze from './Maze';
import config from './config';

import { DIR_NAMES } from './constants';

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: CanvasRenderer,
	config,
	canvas
}).init().render();

function draw() {
	maze.render();
	requestAnimationFrame(draw);
}