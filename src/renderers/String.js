import { WALL_CORNER, WALL_H, WALL_V, PASSAGE_BLOCKED, PASSAGE_OPEN } from '../constants';

const cellPartMap = {
	[WALL_CORNER]: "*",
	[WALL_H]: '---',
	[WALL_V]: '|',
	[PASSAGE_OPEN]: "   ",
	[PASSAGE_BLOCKED]: '///',

	WALL_OPEN: " "
}

const StringRenderer = (Grid, useBlockedCell = false) => {
	let output = '';
	const cellParts = Grid.toCellParts(useBlockedCell);

	cellParts.forEach(row => {
		row.forEach((part, idx) => {
			// check if passage_open used to be a wall
			// to account for open walls being 3 wide
			if (part === PASSAGE_OPEN && idx % 2 === 0) {
				output += cellPartMap['WALL_OPEN'];
			} else output += cellPartMap[part];
		})
		output += '\n';
	})

	return output.trim();
}

export default StringRenderer;