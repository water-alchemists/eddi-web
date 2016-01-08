'use strict';

const models = require('../../models/'),
	Input = models.Input;

function getAll(req, res, next){

	Input.findAll()
		.then(data => res.send(data))
		.catch(next);
}

module.exports = {
	getAll : getAll
};