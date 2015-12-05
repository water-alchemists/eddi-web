var router = require('express').Router();

module.exports = function(app){
	var paths = [

	];

	paths.map(function(path){
		return require(path);
	})
	.forEach(function(router){
		router(app);
	});
};