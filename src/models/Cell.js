import Vec from "./Vec";
import { oppositeDir } from '../utils';
import { DIR_NAMES } from '../constants';

export default class Cell {
	constructor({ x, y }) {
		this.pos = new Vec(x, y);
		
		this.links = {}; // [DIR_NAMES.E]: true
		this.neighbors = {}; // [DIR_NAMES.E]: Cell object...

		this.initialized = false;
		this.isRoot = false;
		this.isFinish = false;
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

	get numLinks() {
		return Object.keys(this.links).filter(key => this.links[key]).length;
	}

	get amountNeighbors() {
		return Object.keys(this.neighbors).length;
	}
	get isCorner() {
		return this.amountNeighbors === 2;
	}
	get isEdge() {
		const n = this.amountNeighbors;
		return n === 2 || n === 3;
	}

	init() {
		if (this.initialized) {
			console.warn("Cell is already initialized!");
		}
		this.initialized = true;
		return this;
	}

	hasNeighborInDirection(dir) {
		return Object.keys(this.neighbors).includes(dir);
	}

	getDirectionToNeighbor(cell) {
		for (let [dir, nb] of Object.entries(this.neighbors)) {
			if (nb === cell) {
				return dir;
			}
		}
		return null;
	}

	get neighborsList() {
		return Object.values(this.neighbors);
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