export default {
	width: 640,
	height: 640,
	cellSize: 80,
	wallSize: 4,

	mazeRoot: [0, 0],
	mazeFinish: [-1, -1], // negative means relative to end

	colors: {
		wall: 'black',
		passage: 'white',
		background: 'black',

		rootCell: 'lightgreen',
		finishCell: 'orange',

		generation: {
			currentCell: 'lightskyblue',
			unvisitedCell: 'grey'
		}
	},

	colorSettings: {
		showRoot: true,
		showFinish: true,
		showDistances: true
	},

	generatorAnimFps: 30,
	solverAnimFps: 20,

	generators: {
		binaryTree: {
			bias: "SE"
		},
		sidewinder: {
			verticalBias: 0.5, // lower for longer horizontal paths
		},
		wilsons: {
			animateConnection: true,

		}
	}
}