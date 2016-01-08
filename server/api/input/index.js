'use strict';
const router = require('express').Router(),
	controllers = require('./input.controller');

module.exports = function(app){
	router.get('/', controllers.getAll);
	return router;
};