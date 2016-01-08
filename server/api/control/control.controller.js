'use strict';
const models = require('../../models/'),
	Pin = models.Pin,
	Reading = models.Reading;

function getAll(req, res, next){

	Reading.findAll()
		.then(data => res.send(data))
		.catch(next);
}

module.exports = {
	getAll : getAll
};