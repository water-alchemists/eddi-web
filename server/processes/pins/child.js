'use strict';
const PinModel = require('../../models/pin'),
	ReadingModel = require('../../models/reading');

const promises = require('../../../modules/promises'),
	artik = require('../../../modules/artik/artik');

const analogPinsEnv = process.env.analogPins,
	digitalReadPinsEnv = process.env.digitalReadPins,
	digitalWritePinsEnv = process.env.digitalWritePins,
	analogPins = Array.isArray(analogPinsEnv) ? analogPinsEnv : analogPinsEnv.split(','),
	digitalReadPins = Array.isArray(digitalReadPinsEnv) ? digitalReadPinsEnv : digitalReadPinsEnv.split(','),
	digitalWritePins = Array.isArray(digitalWritePinsEnv) ? digitalWritePinsEnv : digitalWritePinsEnv.split(',');

	function setupAnalogRead(pin){

	}

	function setupDigitalRead(){

	}
	
	function setupDigitalWrite(){
		
	}
	process.on('message', message => {
		console.log(`This is the message ${message}`);
		process.stdout.write('hello');
		process.send({ data: message, env : {analogPins, digitalReadPins, digitalWritePins}});
	});


// }