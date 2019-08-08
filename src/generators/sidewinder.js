import { DIR_NAMES } from "../constants";
import { rndElement } from '../utils';

// Work through grid by row, grouping cells together 
//		(random amount, the "run" of cells)
// Sometimes carve north (dependent on coin flip)
const coinFlip = (odds = 0.5) => {
	return Math.random() < odds;
}

export default function* sidewinderAlgorithm({ grid, config }, onCycle, onFinish) {
	const { verticalBias = 0.5 } = config.generators.sidewinder;
	const g = grid.grid;

	for (let y = 0; y < g.length; y++) {
		
		let run = [];

		for (let x = 0; x < g[y].length; x++) {
			const cell = g[y][x];
			
			run.push(cell);

			const atEasternEdge = !cell.neighbors[DIR_NAMES.E];
			const atNorthernEdge = !cell.neighbors[DIR_NAMES.N];

			const shouldClose = atEasternEdge || (!atNorthernEdge && coinFlip(verticalBias));

			if (shouldClose) {
				const rndCell = rndElement(run);
				if (rndCell.neighbors[DIR_NAMES.N]) {
					rndCell.link(DIR_NAMES.N, true);
				}
				run = [];
			} else {
				cell.link(DIR_NAMES.E, true);
			}

			cell.initialized = true;

			yield onCycle({current: g[y][x]});
		}
	}
	return onFinish();
}