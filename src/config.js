export default {
	width: 640,
	height: 640,
	cellSize: 40,
	wallSize: 4,

	colors: {
		wall: 'black',
		passage: 'white',
		background: 'black',

		generation: {
			currentCell: 'lightgreen',
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