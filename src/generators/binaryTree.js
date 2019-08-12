import { DIR_NAMES } from '../constants';
import { rndElement } from '../utils/random';

export default function * binaryTreeAlgorithm({ grid, config }, onCycle, onFinish) {
	const { bias = "NE" } = config.generators.binaryTree;

	const dirs = bias.split('').map(biasDir => DIR_NAMES[biasDir]);

	const g = grid.grid;

	for (let y = 0; y < g.length; y++) {
		for (let x = 0; x < g[y].length; x++) {
			const cell = g[y][x];
			const nbs = Object.keys(cell.neighbors).filter(nbDir => dirs.includes(nbDir));
			if (nbs.length) {
				const nb = rndElement(nbs);
				cell.link(nb, true);
			}
			cell.initialized = true;
			yield onCycle({current: [cell]});
		}
	}

	onFinish();
	return;
}