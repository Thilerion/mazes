import Vec from "./Vec";
import { oppositeDir } from '../utils';

export default class Cell {
	constructor({ x, y }) {
		this.pos = new Vec(x, y);
		
		this.links = {};
		this.neighbors = {};
	}

	get x() {
		return this.pos.x;
	}
	get y() {
		return this.pos.y;
	}

	goTo(direction) {
		return this.neighbors[direction];
	}

	link(direction, bidi = true) {
		this.links[direction] = true;

		if (bidi && this.neighbors[direction]) {
			this.goTo(direction).link(oppositeDir(direction), false);
		}
	}
}