'use strict';
const PinModel = require('../../models/pin');

const promises = require('../../../modules/promises'),
	artik = require('../../../modules/artik');

const digitalWritePinsEnv = process.env.digitalWritePins,
	digitalWritePins = Array.isArray(digitalWritePinsEnv) ? digitalWritePinsEnv : digitalWritePinsEnv.split(',');

process.on('message', message => {
	console.log(`This is the message ${message}`);
	process.stdout.write('hello');
	process.send({ data: message, env : {digitalWritePins}});
});