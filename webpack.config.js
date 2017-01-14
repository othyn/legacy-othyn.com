let PTH = require('path');
let CWP = require('copy-webpack-plugin');
let ETP = require("extract-text-webpack-plugin");
let OCA = require('optimize-css-assets-webpack-plugin');

let SRC = PTH.join(__dirname, 'src');
let DIST = PTH.join(__dirname, 'dist');

module.exports = {
	context: SRC,
	entry: {
		index: './js/index.js'
	},
	output: {
		path: DIST,
		publicPath: '/',
		filename: '[name].bundle.min.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				// loader: 'style!css'
				loader: ETP.extract("style", "css")
			},
			{
				test: /\.scss$/,
				// loader: 'style!css!sass'
				loader: ETP.extract("style", "css!sass")
			}
		]
	},
	plugins: [
		new CWP([
			{
				from: PTH.join(SRC, 'index.html'),
				to: DIST
			}
		]),
		new ETP("[name].bundle.min.css"),
		new OCA()
	],
	devServer: {
		contentBase: DIST,
		outputPath: DIST,
		inline: true,
		stats: 'errors-only'
	}
}