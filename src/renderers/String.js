import { WALL_CORNER, WALL_H, WALL_V, PASSAGE_BLOCKED, PASSAGE_OPEN, WALL_OPEN } from '../constants';

const cellPartMap = {
	[WALL_CORNER]: "*",
	[WALL_H]: '---',
	[WALL_V]: '|',
	[WALL_OPEN]: ' ',
	[PASSAGE_OPEN]: "   ",
	[PASSAGE_BLOCKED]: '///',
}

export default class StringRenderer {
	constructor({ grid, config }) {
		this.grid = grid;
		this.config = config;
	}

	render({ useBlockedCell = false, toConsole = false } = {}) {
		let output = '';
		const cellParts = this.grid.toCellParts(useBlockedCell);

		cellParts.forEach(row => {
			row.forEach((part, idx) => {
				output += cellPartMap[part];
			})
			output += '\n';
		})
	
		if (toConsole) {
			console.log(output);
		}
		return output.trim();
	}

	update({ grid }) {
		this.grid = grid;
		return this;
	}
}