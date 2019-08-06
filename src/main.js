import CanvasRenderer from './renderers/Canvas';
import Maze from './Maze';
import config from './config';

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: CanvasRenderer,
	config,
	canvas
})