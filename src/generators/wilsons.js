import { rndElementSet, rndElement } from '../utils';

// Choose any cell on the grid and mark as visited
// Choose a random cell on the grid, and move to neighbors continually, carving out a path
// If a part of the path intersects with the path (a loop), delete that loop and continue
// This continues until any visited cell is found, upon which all cells in the path will be linked

// PROS: Completely random, no bias
// CONS: Slow to start, quick to finish (as opposed to aldousBroder which is the other way around)

export default function* wilsonsAlgorithm({ grid }, onCycle, onFinish) {
	// INITIALIZATION
	let unvisited = [];
	grid.forEachCell((cell, x, y) => {
		unvisited.push(cell);
	})

	// visit first cell
	let first = rndElement(unvisited);
	first.initialized = true;
	let firstIdx = unvisited.indexOf(first);
	unvisited.splice(firstIdx, 1);

	yield onCycle({ current: [first] });

	while (unvisited.length > 0) {
		let cell = rndElement(unvisited);
		let path = [cell];

		yield onCycle({current: path});

		while (unvisited.includes(cell)) {
			cell = rndElement(Object.values(cell.neighbors));
			
			const pathIdx = path.indexOf(cell);
			if (path.includes(cell)) {
				path = path.slice(0, pathIdx + 1);
			} else {
				path.push(cell);
			}
			yield onCycle({current: path});
		}

		for (let i = 0; i < path.length - 1; i++) {
			let pCell = path[i];
			let nb = path[i + 1];
			let dir = pCell.getDirectionToNeighbor(nb);
			pCell.link(dir);
			pCell.initialized = true;

			const unvisitedIdx = unvisited.indexOf(pCell);
			unvisited.splice(unvisitedIdx, 1);

			yield onCycle({ current: path });
		}
	}

	onFinish();
	return;
}