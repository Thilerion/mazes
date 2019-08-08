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

	static fromRelative(x, y, maxX, maxY) {
		const relX = x < 0 ? maxX + x : x;
		const relY = y < 0 ? maxY + y : y;
		return new Vec(relX, relY);
	}
}