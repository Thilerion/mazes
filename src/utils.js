import { DIR_NAMES } from './constants';
import Vec from './models/Vec';

export const dirVectors = {
	[DIR_NAMES.N]: new Vec(0, -1),
	[DIR_NAMES.E]: new Vec(1, 0),
	[DIR_NAMES.S]: new Vec(0, 1),
	[DIR_NAMES.W]: new Vec(-1, 0)
}

const oppositeDirections = {
	[DIR_NAMES.N]: DIR_NAMES.S,
	[DIR_NAMES.E]: DIR_NAMES.W,
	[DIR_NAMES.S]: DIR_NAMES.N,
	[DIR_NAMES.W]: DIR_NAMES.E
}

export const oppositeDir = dir => {
	return oppositeDirections[dir];
}