import Grid from '../../src/models/Grid';
import StringRenderer from '../../src/renderers/String';
import { DIR_NAMES } from '../../src/constants';

describe('renderer to string', () => {
	let grid;
	let renderer;

	beforeEach(() => {
		grid = new Grid({ cols: 2, rows: 2 }).init().configureNeighbors();
		renderer = new StringRenderer({ grid });
	})

	it('correctly renders a closed Grid object to a string', () => {
		const str = renderer.render();

		let expected = [
			'*---*---*',
			'|   |   |',
			'*---*---*',
			'|   |   |',
			'*---*---*'
		].join('\n');

		expect(str).toBe(expected);
	})

	it('correctly handles linked cells', () => {
		grid.grid[0][0].link(DIR_NAMES.E, true);

		const str = renderer.render();

		let expected = [
			'*---*---*',
			'|       |',
			'*---*---*',
			'|   |   |',
			'*---*---*'
		].join('\n');

		expect(str).toBe(expected);
	})

	it('can handle blocked off cells', () => {
		grid.grid[0][0].link(DIR_NAMES.E, true);

		const str = renderer.render({useBlockedCell: true});

		let expected = [
			'*---*---*',
			'|       |',
			'*---*---*',
			'|///|///|',
			'*---*---*'
		].join('\n');

		expect(str).toBe(expected);
	})
})