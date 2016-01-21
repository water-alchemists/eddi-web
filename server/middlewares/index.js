'use strict';
const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser');
module.exports = function(app){
	//sets templating engine to jade
	app.set('view engine', 'jade');

	//parses form data
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	//exposes node_modules
	app.use('/modules', express.static(path.resolve(__dirname, '../../node_modules')));
	return app;
}