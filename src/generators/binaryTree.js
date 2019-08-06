import { DIR_NAMES } from '../constants';
import { rndElement } from '../utils';

export default function binaryTreeAlgorithm(Maze, onCycle, onFinish) {
	const { grid, config } = Maze;
	const { bias = "NE" } = config.generators.binaryTree;

	const dirs = bias.split('').map(biasDir => DIR_NAMES[biasDir]);

	grid.forEachCell((cell, x, y) => {
		const nbs = Object.keys(cell.neighbors).filter(nbDir => dirs.includes(nbDir));

		console.log(nbs);

		if (!nbs.length) return;

		const nb = rndElement(nbs);
		cell.link(nb, true);
	})

	onFinish();
}