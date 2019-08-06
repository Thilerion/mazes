export default class Vec {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	equals(other) {
		return this.x === other.x && this.y === other.y;
	}

	plus(other) {
		return new Vec(this.x + other.x, this.y + other.y);
	}

	minus(other) {
		return new Vec(this.x - other.x, this.y - other.y);
	}
}