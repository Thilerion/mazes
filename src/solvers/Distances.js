export default class Distances {
	constructor(rootCell) {
		this.rootCell = rootCell;
		
		this.initialized = false;

		this.values = new Map();

		this.values.set(rootCell, 0);

		this.maxDistance = null;
	}

	getDistancePercentage(cell) {
		const d = this.values.get(cell);
		return d / this.maxDistance;
	}

	calculate() {
		let frontier = [this.rootCell];
		
		while (frontier.length > 0) {

			let newFrontier = [];
			frontier.forEach(cell => {
				for (let linkDir in cell.links) {
					const linkedCell = cell.neighbors[linkDir];
					if (!this.values.has(linkedCell)) {
						this.values.set(linkedCell, this.values.get(cell) + 1);
						newFrontier.push(linkedCell);
					}
				}
			})
			frontier = newFrontier;
		}

		this.getMaxDistance();
		this.initialized = true;
	}

	getMaxDistance() {
		this.maxDistance = Math.max(...this.values.values());
	}
}