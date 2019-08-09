export default function* distanceSolver({rootCell}, onCycle, onFinish) {
	const values = new Map();

	values.set(rootCell, 0);
	
	let frontier = [rootCell];

	while (frontier.length > 0) {
		let newFrontier = [];

		frontier.forEach(cell => {
			for (let linkDir in cell.links) {
				const linkedCell = cell.neighbors[linkDir];
				if (!values.has(linkedCell)) {
					values.set(linkedCell, values.get(cell) + 1);
					newFrontier.push(linkedCell);
				}
			}
		})
		frontier = newFrontier;
		yield onCycle({ current: newFrontier, values });
	}

	onFinish({ current: [], values });
	
	console.log(Math.max(...values.values()));

	return;
}