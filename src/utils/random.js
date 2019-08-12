export const rnd = (maxExcl) => Math.floor(Math.random() * maxExcl);

export const rndElement = arr => arr[rnd(arr.length)];

export const rndElement2D = d2Arr => {
	const row = d2Arr[rnd(d2Arr.length)];	
	return row[rnd(row.length)];
}