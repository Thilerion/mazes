import Grid from '../../src/models/Grid';
import Cell from '../../src/models/Cell';
import { DIR_NAMES } from '../../src/constants';

const gridOptions = {
	cols: 15,
	rows: 10,
	config: {}
};

describe('Grid class', () => {
	it('accepts columns and rows', () => {
		let g = new Grid(gridOptions);

		expect(g.cols).toBe(gridOptions.cols);
		expect(g.rows).toBe(gridOptions.rows);
	})

	describe('init', () => {
		it('returns itself', () => {
			const g = new Grid(gridOptions);
			expect(g.init()).toBe(g);
		})

		it('creates a 2d array with empty cells', () => {
			const g = new Grid(gridOptions).init();

			expect(g).toHaveProperty('grid');
			expect(g.grid).toHaveLength(gridOptions.rows);
			expect(g.grid[0]).toHaveLength(gridOptions.cols);
		})
	})

	describe('configure neighbors', () => {
		let g;
		beforeEach(() => {
			g = new Grid(gridOptions).init();
		});

		it('returns itself', () => {
			expect(g.configureNeighbors()).toBe(g);
		})

		it('gives each inner cell 4 neighbors', () => {
			g.configureNeighbors();

			const innerCellA = g.grid[2][2];
			const innerCellB = g.grid[5][3];

			expect(Object.keys(innerCellA.neighbors)).toHaveLength(4);
			expect(Object.keys(innerCellB.neighbors)).toHaveLength(4);
		})

		it('gives each outer cell 3 and each corner cell 2 neighbors', () => {
			g.configureNeighbors();

			const cornerCell = g.grid[0][0];
			const outerCell = g.grid[5][0];

			expect(Object.keys(cornerCell.neighbors)).toHaveLength(2);
			expect(Object.keys(outerCell.neighbors)).toHaveLength(3);
		})

		it('has neighbors referencing eachother', () => {
			g.configureNeighbors();

			const cell = g.grid[5][5];

			expect(cell.neighbors[DIR_NAMES.W].neighbors[DIR_NAMES.E]).toBe(cell);
		})
	})

	describe('toString method', () => {
		it('returns the correct string with all walls', () => {
			const g = new Grid({ cols: 3, rows: 3 }).init().configureNeighbors();
			const expected = [
				'*---*---*---*',
				'|   |   |   |',
				'*---*---*---*',
				'|   |   |   |',
				'*---*---*---*',
				'|   |   |   |',
				'*---*---*---*'
			].join('\n');
			const str = g.toString();
			expect(str).toEqual(expected);
		})

		it('returns the correct string with some walls missing', () => {
			const g = new Grid({ cols: 3, rows: 3 }).init().configureNeighbors();
			g.grid[0][0].link(DIR_NAMES.E, true);
			g.grid[0][0].link(DIR_NAMES.W);
			g.grid[1][1].link(DIR_NAMES.S, true);
			g.grid[1][1].link(DIR_NAMES.N, true);
			g.grid[2][1].link(DIR_NAMES.E, true);
			const expected = [
				'*---*---*---*',
				'        |   |',
				'*---*   *---*',
				'|   |   |   |',
				'*---*   *---*',
				'|   |       |',
				'*---*---*---*'
			].join('\n');
			const str = g.toString();
			expect(str).toEqual(expected);
		})
	})
})