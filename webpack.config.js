let PTH = require('path');
let CWP = require('copy-webpack-plugin');
let ETP = require('extract-text-webpack-plugin');
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
				loader: ETP.extract(
					'style',
					'css!postcss'
				)
			},
			{
				test: /\.scss$/,
				loader: ETP.extract(
					'style',
					'css!postcss!sass'
				)
			},
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml'
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
		new ETP('[name].bundle.min.css'),
		new OCA()
	],
	devServer: {
		contentBase: DIST,
		outputPath: DIST,
		inline: true,
		stats: 'errors-only'
	}
}