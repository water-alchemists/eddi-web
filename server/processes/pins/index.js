'use strict';
const cp = require('child_process');

function PinMaster(pinMap){
	const analog = pinMap.analog,
		digitalRead = pinMap.digitalRead,
		digitalWrite = pinMap.digitalWrite;

	this.analogPins = analog;
	this.digitalReadPins = digitalRead;
	this.digitalWritePins = digitalWrite;
	this.tasks = {};
	this.process;
}

PinMaster.prototype.init = function(){
	this.createProcess();
};

PinMaster.prototype.createProcess = function(){
	const analogPins = this.analogPins,
		digitalReadPins = this.digitalReadPins,
		digitalWritePins = this.digitalWritePins;

	const env = {
		analogPins,
		digitalReadPins,
		digitalWritePins,
	},
	options = {
		env
	};

	const child = cp.fork(`${__dirname}/child`, options);
	child.on('message', (message) => {
		const id = message.id,
			data = message.data;

		//triggers the callback url for that task
		this.tasks[id](data);

		//delete the task once completed
		delete this.tasks[id];
	});
}

PinMaster.prototype.digitalWrite = function(queryPin, value){
	const isWriteable = this.digitalWritePins.some(pin => pin === queryPin),
		child = this.process;
	return new Promise((resolve, reject) => {
		if(!isWriteable) return reject(`Pin ${queryPin} is not set up to be a digital writeable pin.`);
		const id = new Date(),
			data = Object.assign({}, { id, value }, { direction: 'out'});
		
		//assign a callback
		this.task[id] = function(data){
			resolve(data);
		};

		//send a message
		child.send(data);
	});
}

module.exports = function(pinMap){
	var pinInstance;

	const init = () => new PinMaster(pinMap);

	if(pinInstance) return pinInstance;
	else {
		pinInstance = init();
		return pinInstance;
	}

}