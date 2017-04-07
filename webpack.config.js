var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry  :[
		// './ts/style.ts',
		'./ts/dailyToDoCard.ts',
		'./ts/todoItem.ts',
		'./ts/todoItemList.ts'

	],
	output: {
		path    : "js",
		filename: '[name].js'
	},

	module:{
		loaders:[{
			test   : /\.tsx?$/, // only run on files with this extension
			loader : 'ts-loader', // name of loader
			include: path.resolve(__dirname, 'ts') //relative path
	     }]
	},
	resolve:{
		extensions: ['.ts', '.tsx', '.js']
	},
	watch: true // compile on save
}
