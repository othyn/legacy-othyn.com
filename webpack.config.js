var CWP = require('copy-webpack-plugin');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: 'dist/js',
		filename: 'bundle.js'
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}
		]
	},
	plugins: [
		new CWP([
			{
				from: './src/index.html',
				to: '..'
			}
		])
	]
}