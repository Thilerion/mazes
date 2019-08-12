// Source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md
const mulberry32 = (seed) => () => {
	seed |= 0; seed = seed + 0x6D2B79F5 | 0;
	let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
	t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

let seededRnd = Math.random;

export const reseed = (seed = Math.random()) => {
	seededRnd = mulberry32(seed);
}

export const rnd = (maxExcl) => Math.floor(seededRnd() * maxExcl);

export const rndElement = arr => arr[rnd(arr.length)];

export const rndElement2D = d2Arr => {
	const row = d2Arr[rnd(d2Arr.length)];	
	return row[rnd(row.length)];
}