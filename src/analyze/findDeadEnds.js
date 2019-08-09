import { DIR_NAMES } from "../constants";
import { oppositeDir } from '../utils';

export default function findDeadEnds(Grid, detailed = false) {
	let result = findDeadEndsBasic(Grid, detailed);

	if (detailed) {
		result = findDeadEndsDetailed(Grid, result);
	}

	return result;
}

function findDeadEndsBasic(Grid, detailed) {
	const list = [];
	Grid.forEachCell((cell) => {
		if (cell.numLinks === 1) {
			list.push(cell);
		}
	})

	if (!detailed) {
		console.log(`DEAD ENDS ANALYSIS:\n${list.length} dead ends.\n`);
	}
	return {
		list,
		count: list.length
	}
}

function findDeadEndsDetailed(Grid, basicResult) {
	const { list, count } = basicResult;

	let result = {
		list,
		count,
		deadEndDirections: getDeadEndDirections(list),
		deadEndPassageLengths: getDeadEndLengths(list)
	};

	console.log(result);

	return result;
}

function getDeadEndDirections(deadEndCells) {
	const deadEndDirections = { [DIR_NAMES.N]: 0, [DIR_NAMES.E]: 0, [DIR_NAMES.S]: 0, [DIR_NAMES.W]: 0 };

	deadEndCells.forEach(cell => {
		const dir = Object.keys(cell.links)[0];
		deadEndDirections[oppositeDir(dir)] += 1;
	});

	return deadEndDirections;
}

function getDeadEndLengths(deadEndCells) {
	const deadEndLengths = new Map();

	deadEndCells.forEach(cell => {
		
		let path = [cell];

		for (let i = 0; i < path.length; i++) {
			const pCell = path[i];
			if (pCell.numLinks === 1) {
				const dir = Object.keys(pCell.links)[0];
				const nb = pCell.neighbors[dir];
				path.push(nb);
			} else if (pCell.numLinks === 2) {
				const linkDirs = Object.keys(pCell.links);
				const linkCells = linkDirs.map(d => pCell.neighbors[d]);
				const availCells = linkCells.filter(c => !path.includes(c));

				if (availCells) {
					path.push(availCells[0]);
				}
			}
		}
		deadEndLengths.set(cell, path.length - 1);
	})

	return deadEndLengths;
}