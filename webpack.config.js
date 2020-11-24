const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const filename = (ext) => (isDev ? `[name].bundle.${ext}` : `[name].[hash:7].bundle.${ext}`);
const getStyleLoaders = () => [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'];
const getJsLoaders = () => {
	const loaders = ['babel-loader'];
	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
};
console.log('MODE:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		},
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: process.env.PORT,
		overlay: true,
		open: true,
		hot: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			minify: {
				collapseWhitespace: isProd,
				removeComments: isProd,
			},
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: getStyleLoaders(),
			},
			{
				test: /\.s[ac]ss$/i,
				use: [...getStyleLoaders(), 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name]-[sha1:hash:7].[ext]',
						},
					},
				],
			},
			{
				test: /\.svg$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'svg',
							name: '[name]-[sha1:hash:7].[ext]',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
							name: '[name].[ext]',
						},
					}],
			},
			{
				test: /\.(m?js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: getJsLoaders(),
			},
		],
	},

};
