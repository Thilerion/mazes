import { DIR_NAMES } from '../constants';
import { rndElement } from '../utils';

export default function * binaryTreeAlgorithm(Maze, onCycle, onFinish) {
	const { grid, config } = Maze;
	const { bias = "NE" } = config.generators.binaryTree;

	const dirs = bias.split('').map(biasDir => DIR_NAMES[biasDir]);

	// grid.forEachCell((cell, x, y) => {
	// 	const nbs = Object.keys(cell.neighbors).filter(nbDir => dirs.includes(nbDir));

	// 	console.log(nbs);

	// 	if (nbs.length) {
	// 		const nb = rndElement(nbs);
	// 		cell.link(nb, true);
	// 	}
	// 	yield;
	// })

	const g = grid.grid;

	for (let y = 0; y < g.length; y++) {
		for (let x = 0; x < g[y].length; x++) {
			const cell = g[y][x];
			const nbs = Object.keys(cell.neighbors).filter(nbDir => dirs.includes(nbDir));
			if (nbs.length) {
				const nb = rndElement(nbs);
				cell.link(nb, true);
				yield onCycle();
			}
		}
	}

	onFinish();
	return;
}