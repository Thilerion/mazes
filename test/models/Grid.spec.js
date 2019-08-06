import Grid from '../../src/models/Grid';
import Cell from '../../src/models/Cell';
import { DIR_NAMES, CELL_PARTS } from '../../src/constants';

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
	
	describe('toCellParts method', () => {
		const rows = 4;
		const cols = 3;
		let g;
		beforeEach(() => {
			g = new Grid({ cols, rows }).init().configureNeighbors();
		})

		it('correctly assigns first row of walls and corners', () => {
			const output = g.toCellParts();

			const firstRowTopWall = output[0].join('');
			const expected = CELL_PARTS.WALL_CORNER + (CELL_PARTS.WALL_H + CELL_PARTS.WALL_CORNER).repeat(cols);

			expect(firstRowTopWall).toBe(expected);
		})

		it('returns the correct amount of rows and columns', () => {
			const output = g.toCellParts();
			const expectedRows = rows * 2 + 1; // rows*(mid + bottom) + 1*(top)
			const expectedCols = cols * 2 + 1;

			expect(output).toHaveLength(expectedRows);
			expect(output[0]).toHaveLength(expectedCols);
		})

		it('correctly returns open passages', () => {
			g.grid[1][1].link(DIR_NAMES.E, true);
			g.grid[0][0].link(DIR_NAMES.N, false);
			const output = g.toCellParts();

			const expectedTop = [
				CELL_PARTS.WALL_CORNER,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.WALL_CORNER,
				CELL_PARTS.WALL_H,
				CELL_PARTS.WALL_CORNER,
				CELL_PARTS.WALL_H,
				CELL_PARTS.WALL_CORNER
			]

			expect(output[0]).toEqual(expectedTop);

			const secondRowBody = output[3]; // wall, cells(1st), wall, cells(2nd)
			const expectedSecondRowBody = [
				CELL_PARTS.WALL_V,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.WALL_V,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.WALL_V,
			];

			expect(secondRowBody).toEqual(expectedSecondRowBody);
		})

		it('can handle entirely blocked off cells', () => {
			g.grid[0][0].link(DIR_NAMES.E, true);

			let output = g.toCellParts();
			let firstRowBody = output[1];
			let expected = [
				CELL_PARTS.WALL_V,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.WALL_V,
				CELL_PARTS.PASSAGE_OPEN,
				CELL_PARTS.WALL_V
			];

			expect(firstRowBody).toEqual(expected);

			output = g.toCellParts(true);
			firstRowBody = output[1];
			// Because no links to other cells, this entire cell is blocked off.
			expected[5] = CELL_PARTS.PASSAGE_BLOCKED;
			expect(firstRowBody).toEqual(expected);
		})
	})
})