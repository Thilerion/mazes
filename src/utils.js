import { DIR_NAMES } from './constants';
import Vec from './models/Vec';

export const dirVectors = {
	[DIR_NAMES.N]: new Vec(0, -1),
	[DIR_NAMES.E]: new Vec(1, 0),
	[DIR_NAMES.S]: new Vec(0, 1),
	[DIR_NAMES.W]: new Vec(-1, 0)
}