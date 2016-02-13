'use strict';
const PinModel = require('../../models/pin'),
	ReadingModel = require('../../models/reading');

const promises = require('../../../modules/promises'),
	artik = require('../../../modules/artik');

function log(){
	var index = 0;
	return new Promise((resolve, reject) => {
		try {
			console.log(`hello ${index++} at ${new Date()}`);
		}
		catch(e){
			reject(e);
		}
		
	})
}

promises.polling(500, 5, log)