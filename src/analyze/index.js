import findDeadEnds from './findDeadEnds';

const analyzers = [
	findDeadEnds
];

export default class Analyze {
	constructor(config, analysisList = analyzers) {
		this.performPostAnalysis = config.analyze.performPostAnalysis;
		this.detailedPostAnalysis = config.analyze.detailedPostAnalysis;

		this.analyzers = analysisList;
	}

	postGeneration(Grid) {
		const detailed = this.detailedPostAnalysis;

		return this.analyzers.map(fn => fn(Grid, detailed));
	}
}