'use strict';
const pinSeeder = require('./Pin'),
	readingSeeder = require('./Reading');

module.exports = function(models){
	const seeders = [
		pinSeeder,
		readingSeeder,
	],
	promises = seeders.map(seeder => {
		return seeder(models);
	});

	return Promise.all(promises);
}