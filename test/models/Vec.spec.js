import Vec from '../../src/models/Vec';

describe('Vector class', () => {
	it('defaults to (0, 0) coordinates', () => {
		let v = new Vec();
		expect(v.x).toBe(0);
		expect(v.y).toBe(0);
	})

	it('takes in x and y parameters', () => {
		let v = new Vec(1, 2);
		expect(v.x).toBe(1);
		expect(v.y).toBe(2);
	})

	it('correctly checks if equal to another vector', () => {
		let v1 = new Vec(10, 20);
		let v2 = new Vec(15, 20);

		expect(v1.equals(v2)).toBe(false);

		v2 = new Vec(10, 20);

		expect(v1.equals(v2)).toBe(true);
	})

	describe('Vector addition', () => {
		it('returns a new vector object', () => {
			let v1 = new Vec(10, 20);
			let v2 = new Vec(1, 1);

			expect(v1.plus(v2)).not.toBe(v1);
		})

		it('adds both coordinates', () => {
			let v1 = new Vec(10, 20);
			let v2 = new Vec(1, 1);
			let vAdded = v1.plus(v2);

			expect(vAdded.x).toBe(10 + 1);
			expect(vAdded.y).toBe(20 + 1);
		})
	})

	describe('Vector subtraction', () => {
		it('subtracts a second vector\'s coordinates from itself', () => {
			let v1 = new Vec(10, 10);
			let v2 = new Vec(-20, -15);
			let vSubbed = v1.minus(v2);

			expect(vSubbed.x).toBe(10 - (-20));
			expect(vSubbed.y).toBe(10 - (-15));
		})
	})
})