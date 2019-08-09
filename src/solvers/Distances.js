export default class Distances {
	constructor(rootCell) {
		this.rootCell = rootCell;
		
		this.initialized = false;

		this.values = new Map();

		this.maxDistance = null;
	}

	setRootCell(rootCell) {
		this.rootCell = rootCell;
		this.initialized = false;
		this.values = new Map();
		this.maxDistance = null;
		return this;
	}

	calculate() {
		this.values.set(this.rootCell, 0);
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
		return this;
	}
}