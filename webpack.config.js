var path = require('path');
var CWP = require('copy-webpack-plugin');

var src = path.join(__dirname, 'src');
var dist = path.join(__dirname, 'dist');

module.exports = {
	context: src,
	entry: {
		index: './js/index.js'
	},
	output: {
		// path: path.join(dist, 'js'), in order for live reload to work, I require html and js to be in the same dir
		path: dist,
		publicPath: '/',
		filename: '[name].bundle.js'
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
				from: path.join(src, 'index.html'),
				to: dist
			}
		])
	],
	devServer: {
		contentBase: dist,
		outputPath: dist,
		inline: true,
		stats: 'errors-only'
	}
}