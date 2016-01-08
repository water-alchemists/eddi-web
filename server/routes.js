'use strict';
const router = require('express').Router()
module.exports = function(app){
	router.use('/salinity', require('./api/salinity')(app));
	router.use('/control', require('./api/control')(app));
	router.use('/input', require('./api/input')(app));
	
    router.use((req, res) => res.status(404).end());

	return router;
};
