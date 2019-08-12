import { rndElement2D, rndElement } from '../utils/random';

// Start anywhere on the grid, choose random neighbor
// Move to that neighbor. If it hasn't been visited yet, link it to previous cell
// Repeat until every cell is visited

// PROS: Completely random, no bias
// CONS: Can take a long time to visit every cell, using a heuristic to limit its length
//			removes its greatest strength
export default function* aldousBroderAlgorithm({ grid }, onCycle, onFinish) {
	

	const g = grid.grid;

	// Keep track of amount of unvisited cells, minus the current cell
	let nUnvisited = grid.size - 1;

	// Keep track of current cell
	let currentCell = rndElement2D(g);
	currentCell.initialized = true;
	yield onCycle({ current: [currentCell] });

	while (nUnvisited > 0) {
		let neighborDir = rndElement(Object.keys(currentCell.neighbors));
		let neighbor = currentCell.neighbors[neighborDir];

		if (neighbor.numLinks === 0) { // maybe can do if !initialized
			currentCell.link(neighborDir);
			neighbor.initialized = true;
			nUnvisited -= 1;
		}

		currentCell = neighbor;
		yield onCycle({ current: [currentCell] });
	}

	onFinish();
	return;
}