import Cell from '../../src/models/Cell';
import Vec from '../../src/models/Vec';

describe('Cell class', () => {
	describe('instantiation', () => {
		it('can be instantiated with a Vector', () => {
			let v = new Vec(1, 2);
			let c = new Cell(v);

			expect(c.pos).toEqual(v);
		})

		it('can be instantiated with an x and y object', () => {
			let c = new Cell({ x: 1, y: 2 });
			let v = new Vec(1, 2);

			expect(c.pos).toEqual(v);
		})
	})

	it('has a pos property that is a vector', () => {
		expect(new Cell({ x: 1, y: 2 }).pos).toBeInstanceOf(Vec);
	})

	it('has x and y getters to access its position', () => {
		let c = new Cell({ x: 10, y: 20 });

		expect(c.x).toBe(c.pos.x);
		expect(c.y).toBe(c.pos.y);
		expect(c.x).toBe(10);
		expect(c.y).toBe(20);
	})
})