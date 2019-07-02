const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
let name= '';


const plugins = [new HtmlWebpackPlugin({
	template: 'client/index.html',
	filename: 'index.html',
	inject: 'body'
})];


module.exports = (env) => {
	const environment = env || 'development';
	
	switch (environment) {
		case 'development':
			name = 'appDev';
			break;
		case "production":
		default :
			name = 'appProd';
			
			plugins.push(
				new OptimizeJsPlugin({
					sourceMap: false
				})
			)
			
	}
	
	return {
		mode: environment,
		entry: './client/index.js',
		output: {
			path: path.resolve(__dirname, 'public'),
			filename: name+'.' + environment + '.bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "babel-loader"
				},
				{
					test: /\.css$/,
					use: [
						{loader: 'style-loader'},
						{
							loader: 'css-loader',
							options: {
								modules: true
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: [ 'style-loader', 'css-loader', 'sass-loader' ]
					
				}
			]
		},
		
		plugins: plugins,
		
		optimization: {
			minimizer: [new UglifyJsPlugin()],
		},
		
		devServer: {
			proxy: {
				'/socket.io': {
					target: 'http://localhost:3000',
					ws: true
				}
			}
		}
	}
}