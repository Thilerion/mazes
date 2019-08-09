import findDeadEnds from './findDeadEnds';

const analyzers = [
	findDeadEnds
];

export default class Analyze {
	constructor(config, analysisList = analyzers) {
		this.performPostAnalysis = config.generators.performPostAnalysis;

		this.analyzers = analysisList;
	}

	postGeneration(Grid) {
		return this.analyzers.map(fn => fn(Grid));
	}
}