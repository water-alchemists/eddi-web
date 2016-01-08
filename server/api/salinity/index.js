'use strict';
const router = require('express').Router(),
	controllers = require('./salinity.controller');

module.exports = function(app){
	router.get('/', controllers.getAll);

	return router;
};