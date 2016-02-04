'use strict';
const router = require('express').Router(),
	controllers = require('./input.controller');

module.exports = function(app){
	router.get('/:id', controllers.getPinValue);
	router.post('/:id', controllers.setPinValue);
	return router;
};