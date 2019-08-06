import Grid from '../../src/models/Grid';
import StringRenderer from '../../src/renderers/String';
import { DIR_NAMES } from '../../src/constants';

describe('renderer to string', () => {
	it('correctly renders a closed Grid object to a string', () => {
		const g = new Grid({ cols: 2, rows: 2 }).init().configureNeighbors();
		const str = StringRenderer(g);

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
		const g = new Grid({ cols: 2, rows: 2 }).init().configureNeighbors();
		g.grid[0][0].link(DIR_NAMES.E, true);

		const str = StringRenderer(g);

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
		const g = new Grid({ cols: 2, rows: 2 }).init().configureNeighbors();
		g.grid[0][0].link(DIR_NAMES.E, true);

		const str = StringRenderer(g, true);

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