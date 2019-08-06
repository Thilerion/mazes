import Vec from "./Vec";
import { oppositeDir } from '../utils';
import { DIR_NAMES } from '../constants';

export default class Cell {
	constructor({ x, y }) {
		this.pos = new Vec(x, y);
		
		this.links = {}; // [DIR_NAMES.E]: true
		this.neighbors = {}; // [DIR_NAMES.E]: Cell object...
	}

	get x() {
		return this.pos.x;
	}
	get y() {
		return this.pos.y;
	}
	get walls() {
		const links = Object.keys(this.links).filter(key => this.links[key]);

		return Object.values(DIR_NAMES).filter(dir => !links.includes(dir));
	}

	setNeighbor(cell, direction) {
		this.neighbors[direction] = cell;
	}

	link(direction, bidi = true) {
		this.links[direction] = true;

		if (bidi && this.neighbors[direction]) {
			this.neighbors[direction].link(oppositeDir(direction), false);
		}
	}
}