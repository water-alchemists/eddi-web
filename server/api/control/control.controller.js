'use strict';
const models = require('../../models/'),
	Pin = models.Pin,
	Reading = models.Reading;

function getAll(req, res, next){

	Reading.findAll()
		.then(data => res.status(200).json(data))
		.catch(next);
}

function getLatest(req, res, next){
	Reading.getLatest()
		.then(data => res.status(200).json(data))
		.catch(next);
}

module.exports = {
	getAll,
	getLatest,
};