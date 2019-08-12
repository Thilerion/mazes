import { DIR_NAMES } from '../src/constants';
import { rnd, rndElement, rndElement2D } from '../src/utils/random';
import { oppositeDir } from '../src/utils/directions';

describe('getting the opposite direction', () => {
	it('returns the correct direction', () => {
		expect(oppositeDir(DIR_NAMES.N)).toBe(DIR_NAMES.S);
		expect(oppositeDir(DIR_NAMES.S)).toBe(DIR_NAMES.N);
		expect(oppositeDir(DIR_NAMES.E)).toBe(DIR_NAMES.W);
	})
})

describe('randomize functions', () => {
	describe('rnd', () => {
		it('returns a random integer', () => {
			let n = rnd(10);
			expect(n).toEqual(parseInt(n));
		})

		it('returns a number from 0 up to (but not including) an argument', () => {
			let rndNums = [];
			for (let i = 0; i < 20; i++) {
				rndNums.push(rnd(2));
			}

			expect(rndNums).toContain(0);
			expect(rndNums).toContain(1);
			expect(rndNums).not.toContain(2);
		})
	})

	describe('rnd array element', () => {
		it('returns a random element from an array', () => {
			let arr = [1, 2, 3];

			for (let i = 0; i < 10; i++) {
				expect(arr).toContain(rndElement(arr));
			}
		})
	})

	describe('rnd 2d array element', () => {
		it('returns a random item from a 2d array', () => {
			let arr = [
				['a', 'b'],
				['c', 'd']
			];
			let items = ['a', 'b', 'c', 'd'];
			let randomItems = new Set();
	
			for (let i = 0; i < 50; i++) {
				randomItems.add(rndElement2D(arr));
			}
			
			items.forEach(item => {
				expect(randomItems.has(item)).toBe(true);
			})
		})
	})
})