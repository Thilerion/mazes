import CanvasRenderer from './renderers/Canvas';
import Maze from './Maze';
import config from './config';

import binaryTreeGenerator from './generators/binaryTree';

const canvas = document.getElementById('maze');

let maze = new Maze({
	Renderer: CanvasRenderer,
	config,
	canvas
}).init().render();

maze.generateMazeVisual(binaryTreeGenerator);