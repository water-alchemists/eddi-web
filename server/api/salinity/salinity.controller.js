'use strict';

const models = require('../../models/'),
	Pin = models.Pin,
	Reading = models.Reading;

function getAll(req, res, next){
	console.log('Pin', Pin);
	Pin.findAll()
		.then(data => res.send(data))
		.catch(next);
}

module.exports = {
	getAll : getAll
};