// Source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md
const mulberry32 = (seed) => () => {
	seed |= 0; seed = seed + 0x6D2B79F5 | 0;
	let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
	t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

const getRandomSeed = () => {
	const timestamp = String(Date.now()).slice(-6);
	const rnd = String(Math.random() * 1e6).replace('.', '');
	const str = `${rnd}${timestamp}`.slice(-15);
	return str % Number.MAX_SAFE_INTEGER;
}

let seededRnd = Math.random;
let currentSeed = getRandomSeed();

export const reseed = (seed) => {
	if (!Number.isInteger(seed) && Number.isInteger(parseInt(seed))) {
		seed = parseInt(seed);
	}
	if (!seed || !Number.isInteger(seed)) {
		console.warn("Invalid seed, generating new one.");
		seed = getRandomSeed();
	}
	console.log(`Seed: ${seed}`);
	seededRnd = mulberry32(seed);
	currentSeed = seed;
}

export const resetSeed = () => reseed(currentSeed);

export const rnd = (maxExcl = 1) => Math.floor(seededRnd() * maxExcl);

export const rndElement = arr => arr[rnd(arr.length)];

export const rndElement2D = d2Arr => {
	const row = d2Arr[rnd(d2Arr.length)];	
	return row[rnd(row.length)];
}