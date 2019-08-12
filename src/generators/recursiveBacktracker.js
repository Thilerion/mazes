import { rndElement2D, rndElement } from "../utils/random";

// Works like hunt and kill, except instead of hunting for another cell,
// it backtracks through its last path to find another one.
export default function* recBacktrackerAlgorithm({ grid, config }, onCycle, onFinish) {
	
	const g = grid.grid;
	const { finishBacktracking = true } = config.generators.recursiveBacktracker;

	let nUnvisited = grid.size - 1;
	
	let stack = [rndElement2D(g).init()];
	yield onCycle({ current: [top(stack)] });

	while (stack.length > 0 && (nUnvisited > 0 || finishBacktracking)) {
		const nbs = unvisitedNeighbors(top(stack));

		if (nbs.length === 0) {
			stack.pop();
		} else {
			const nb = rndElement(nbs);
			const dir = top(stack).getDirectionToNeighbor(nb);
			top(stack).link(dir);
			stack.push(nb.init());
			nUnvisited -= 1;
		}

		yield onCycle({ current: [top(stack)], inStack: stack });
	}

	onFinish({ current: [], inStack: [] });
	return;
}

function top(stack) {
	return stack[stack.length - 1];
}

function unvisitedNeighbors(cell) {
	return Object.values(cell.neighbors).filter(nb => !nb.initialized);
}