'use strict';
const router = require('express').Router(),
	controllers = require('./input.controller');

module.exports = function(app){
	router.get('/', controllers.getAll);
	router.post('/', controllers.create);
	router.get('/latest', controllers.getLatest);
	router.get('/earliest', controllers.getEarliest);
	return router;
};