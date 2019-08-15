export default {
	width: 600,
	height: 600,
	cellSize: 10,
	wallSize: 2,

	mazeRoot: [0, 0],
	mazeFinish: [-1, -1], // negative means relative to end

	colors: {
		wall: 'black',
		passage: 'white',
		background: 'white',

		rootCell: 'lightgreen',
		finishCell: 'orange',

		generation: {
			currentCell: 'lightskyblue',
			unvisitedCell: '#666',

			huntAndKillRow: 'rgba(250, 100, 100, 0.2)',
			recursiveInStackCells: 'lightcyan',
		}
	},

	colorSettings: {
		showRoot: true,
		showFinish: true,
		showDistances: true
	},

	generatorAnimFps: 60,
	solverAnimFps: 60,

	seed: 1,

	generators: {
		binaryTree: {
			bias: "SE"
		},
		sidewinder: {
			verticalBias: 0.5, // lower for longer horizontal paths
		},
		wilsons: {
			animateConnection: true,
		},
		huntAndKill: {
			animateHunting: true,
			animateHuntingRowsOnly: true
		},
		recursiveBacktracker: {
			finishBacktracking: true
		}
	},

	analyze: {
		performPostAnalysis: true,
		detailedPostAnalysis: true
	}
}