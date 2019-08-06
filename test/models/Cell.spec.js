import Cell from '../../src/models/Cell';
import Vec from '../../src/models/Vec';
import { DIR_NAMES } from '../../src/constants';

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

	describe('Cell neighbors', () => {
		let c1, c2, dir;
		beforeAll(() => {
			c1 = new Cell({ x: 5, y: 5 });
			c2 = new Cell({ x: 6, y: 5 });
			dir = DIR_NAMES.E;
		})

		it('starts without neighbors', () => {
			expect(Object.keys(c1.neighbors)).toHaveLength(0);
		})

		it('accepts a cell and direction to set a neighbor', () => {
			c1.setNeighbor(c2, dir);
			expect(c1.neighbors[dir]).toBe(c2);
		})
	})

	describe('Cell links', () => {
		it('accepts a direction to link with neighboring cell', () => {
			let c = new Cell({ x: 1, y: 2 });
			c.link(DIR_NAMES.N);

			expect(c.links[DIR_NAMES.N]).toBe(true);
			expect(Object.keys(c.links)).toHaveLength(1);
		})

		it('links its neighbor aswell if it has one in that direction', () => {
			let cWest = new Cell({ x: 0, y: 0 });
			let cEast = new Cell({ x: 1, y: 0 });
			cWest.setNeighbor(cEast, DIR_NAMES.E);
			cEast.setNeighbor(cWest, DIR_NAMES.W);

			expect(cWest.links).not.toHaveProperty(DIR_NAMES.E);

			cWest.link(DIR_NAMES.E, true);

			expect(cWest.links[DIR_NAMES.E]).toBe(true);
			expect(cEast.links[DIR_NAMES.W]).toBe(true);
		})
	})
})