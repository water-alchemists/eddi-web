'use strict';
const pinSeeder = require('./Pin'),
	readingSeeder = require('./Reading'),
	inputSeeder = require('./Input');

module.exports = function(models){
	const seeders = [
		pinSeeder,
		readingSeeder,
		inputSeeder,
	],
	promises = seeders.map(seeder => seeder(models));

	return Promise.all(promises);
}