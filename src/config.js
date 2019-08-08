export default {
	width: 640,
	height: 640,
	cellSize: 40,
	wallSize: 4,

	mazeRoot: [0, 0],
	mazeFinish: [-1, -1], // negative means relative to end

	colors: {
		wall: 'black',
		passage: 'white',
		background: 'black',

		rootCell: 'lightgreen',
		useRootCellColor: true,
		finishCell: 'orange',
		useFinishCellColor: false,

		generation: {
			currentCell: 'lightskyblue',
			unvisitedCell: 'grey'
		}
	},

	generatorAnimFps: 60,

	generators: {
		binaryTree: {
			bias: "SE"
		},
		sidewinder: {
			verticalBias: 0.5, // lower for longer horizontal paths
		}
	}
}