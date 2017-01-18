let PTH = require('path');
let HTM = require('html-webpack-plugin');
let ETP = require('extract-text-webpack-plugin');
let OCA = require('optimize-css-assets-webpack-plugin');
let FIC = require('favicons-webpack-plugin')

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
				test: /\.html$/,
				loader: 'html'
			},
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
		new ETP('[name].bundle.min.css'),
		new OCA(),
		new HTM({
			filename: 'index.html',
			template: './index.html',
			inject: true
		}),
		new HTM({
			filename: 'gaming.html',
			template: './gaming.html',
			inject: true
		}),
		new HTM({
			filename: 'portfolio.html',
			template: './portfolio.html',
			inject: true
		}),
		new HTM({
			filename: 'studio.html',
			template: './studio.html',
			inject: true
		}),
		new FIC({
			logo: './img/favicon.png',
			inject: true,
			background: '#607D8B',
			title: 'Othyn'
		})
	],
	devServer: {
		contentBase: DIST,
		outputPath: DIST,
		inline: true,
		stats: 'errors-only'
	}
}