export default {
	width: 640,
	height: 640,
	cellSize: 40,
	wallSize: 8,

	colors: {
		wall: 'black',
		passage: 'white',
		background: 'black'
	},

	generatorAnimFps: 60,

	generators: {
		binaryTree: {
			bias: "SE"
		}
	}
}