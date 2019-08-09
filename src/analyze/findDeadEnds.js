export default function findDeadEnds(Grid) {
	const list = [];

	Grid.forEachCell((cell, x, y) => {
		if (cell.numLinks === 1) {
			list.push(cell);
		}
	})

	const result = {
		deadEnds: list,
		count: list.length
	};

	console.log(`DEAD ENDS ANALYSIS:\n${result.count} dead ends.\n`);

	return result;
}