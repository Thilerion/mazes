import { DIR_NAMES } from '../src/constants';
import { oppositeDir } from '../src/utils';

describe('getting the opposite direction', () => {
	it('returns the correct direction', () => {
		expect(oppositeDir(DIR_NAMES.N)).toBe(DIR_NAMES.S);
		expect(oppositeDir(DIR_NAMES.S)).toBe(DIR_NAMES.N);
		expect(oppositeDir(DIR_NAMES.E)).toBe(DIR_NAMES.W);
	})
})