import { rndElement, rndElement2D, withoutElement } from "../utils";

export default function* huntAndKillAlgorithm({ grid, config }, onCycle, onFinish) {
	
	const g = grid.grid;
	const { animateHunting = true } = config.generators.huntAndKill;

	let unvisited = [];
	grid.forEachCell((cell, x, y) => {
		unvisited.push(cell);
	})

	let currentCell = rndElement2D(g);
	currentCell.initialized = true;
	unvisited = withoutElement(currentCell, unvisited);

	yield onCycle({ current: [currentCell] });

	while (currentCell) {
		const unvisitedNeighbors = currentCell.neighborsList.filter(nb => unvisited.includes(nb));

		if (unvisitedNeighbors.length > 0) {
			const neighbor = rndElement(unvisitedNeighbors);
			const dir = currentCell.getDirectionToNeighbor(neighbor);

			currentCell.link(dir);
			currentCell = neighbor;
			currentCell.initialized = true;
			unvisited = withoutElement(currentCell, unvisited);

			yield onCycle({ current: [currentCell] });
		} else {
			// HUNT
			// Begins whenever the current cell has no unvisited neighbors
			// 	  (when it has worked itself into a corner)

			currentCell = null;

			for (let y = 0; y < g.length; y++) {
				if (currentCell) break;
				for (let x = 0; x < g[y].length; x++) {
					if (currentCell) break;

					const cell = g[y][x];

					if (animateHunting) {
						yield onCycle({ current: [cell] });
					}

					if (!unvisited.includes(cell)) {
						continue;
					}
					

					const visitedNeighbors = cell.neighborsList.filter(nb => !unvisited.includes(nb));

					if (visitedNeighbors.length > 0) {
						currentCell = cell;

						const nb = rndElement(visitedNeighbors);
						const nbDir = cell.getDirectionToNeighbor(nb);

						currentCell.link(nbDir);
						currentCell.initialized = true;
						
						unvisited = withoutElement(currentCell, unvisited);
					}
				}
			}

			yield onCycle({ current: [currentCell] });
		}
	}

	onFinish();
	return;
}