import { rndElement, rndElement2D, withoutElement } from "../utils";

export default function* huntAndKillAlgorithm({ grid, config }, onCycle, onFinish) {
	
	const g = grid.grid;
	const { animateHunting = true, animateHuntingRowsOnly = true } = config.generators.huntAndKill;

	let currentCell = rndElement2D(g);
	currentCell.initialized = true;
	let nUnvisited = grid.size - 1;

	yield onCycle({ current: [currentCell] });

	while (nUnvisited > 0) {
		const unvisitedNeighbors = currentCell.neighborsList.filter(nb => !nb.initialized);

		if (unvisitedNeighbors.length > 0) {
			const neighbor = rndElement(unvisitedNeighbors);
			const dir = currentCell.getDirectionToNeighbor(neighbor);

			currentCell.link(dir);
			currentCell = neighbor;
			currentCell.initialized = true;
			nUnvisited -= 1;

			yield onCycle({ current: [currentCell] });
		} else {
			// HUNT
			// Begins whenever the current cell has no unvisited neighbors
			// 	  (when it has worked itself into a corner)

			currentCell = null;

			for (let y = 0; y < g.length; y++) {
				if (currentCell) break;

				if (animateHunting && animateHuntingRowsOnly) {
					// yield all cells in rows as "current"
					let rowCells = [...g[y]];
					yield onCycle({ huntAndKillRow: rowCells });
				}

				for (let x = 0; x < g[y].length; x++) {
					if (currentCell) break;

					const cell = g[y][x];

					if (animateHunting && !animateHuntingRowsOnly) {
						yield onCycle({ current: [cell] });
					}

					if (cell.initialized) {
						continue;
					}
					

					const visitedNeighbors = cell.neighborsList.filter(nb => nb.initialized);

					if (visitedNeighbors.length > 0) {
						currentCell = cell;

						if (animateHunting && animateHuntingRowsOnly) {
							// after the row has been shown,
							// and a cell has been found in that row
							// yield that cell
							yield onCycle({ current: [currentCell] });
						}

						const nb = rndElement(visitedNeighbors);
						const nbDir = cell.getDirectionToNeighbor(nb);

						currentCell.link(nbDir);
						currentCell.initialized = true;
						nUnvisited -= 1;
					}
				}
			}

			yield onCycle({ current: [currentCell] });
		}
	}

	onFinish();
	return;
}