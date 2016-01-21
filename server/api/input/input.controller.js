'use strict';

const models = require('../../models/'),
	Input = models.Input;

function getAll(req, res, next){

	Input.findAll()
		.then(data => res.status(200).json(data))
		.catch(next);
}

function create(req, res, next){
	const salinityOut = req.body.salinityOut,
		entry = {salinityOut};
	Input.create(entry)
		.then(data => res.status(200).json(data))
		.catch(next);
}

function getLatest(req, res, next){
	Input.getLatest()
		.then(data => res.status(200).json(data))
		.catch(next);
}

function getEarliest(req, res, next){
	Input.getEarliest()
		.then(data => res.status(200).json(data))
		.catch(next);
}

module.exports = {
	getAll,
	create,
	getLatest,
	getEarliest,
};