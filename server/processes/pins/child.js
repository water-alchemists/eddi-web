'use strict';
const PinModel = require('../../models/pin');

module.exports = function(){
	console.log('these are the process environments', process.env);
	const analogPins = process.env.analogPins,
		digitalReadPins = process.env.digitalReadPins,
		digitalWritePins = process.env.digitalWritePins;

	function setupAnalogRead(pin){

	}

	function setupDigitalRead(){

	}

	function setupDigitalWrite(){

	}
}