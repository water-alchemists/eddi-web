'use strict';
const cp = require('child_process'),
	path = require('path');

const exitCodes = {
	1 : 'Uncaught Fatal Exception',
	3 : 'Internal JavaScript Parse Error',
	4 : 'Internal JavaScript Evaluation Failure',
	5 : 'Fatal Error', 
	6 : 'Non-function Internal Exception Handler',
	7 : 'Internal Exception Handler Run-Time Failure',
	9 : 'Invalid Argument ',
	10 : 'Internal JavaScript Run-Time Failure',
	12 : 'Invalid Debug Argument',
}

function PinMaster(pinMap){
	const analog = pinMap.analog,
		digitalRead = pinMap.digitalRead,
		digitalWrite = pinMap.digitalWrite;

	//create variables 
	this.analogPins = analog;
	this.digitalReadPins = digitalRead;
	this.digitalWritePins = digitalWrite;
	this.tasks = {};
	this.processes;

	//initialize 
	this.init();
}

PinMaster.prototype.init = function(){
	console.log('initalizing')
	this.createProcess();
	this.digitalWrite(4, 'hello')
		.then(reply => console.log('got a reply', reply))
		.catch(err => console.log('this is the err', err));
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
		silent: true,
		env
	};

	const childPath = path.resolve(__dirname, '../..', './server/processes/pins/child.js'),
		child = cp.fork(childPath, options);

	child.on('message', (message) => {
		console.log('got a message back', message);
		const id = message.id,
			data = message.data,
			error = message.error;

		//triggers the callback url for that task
		if(this.tasks[id]) {
			if(error) this.task[id](error)
			else this.tasks[id](null, data);
		}
		console.log('before delete', this.tasks, id);
		//delete the task once completed
		delete this.tasks[id];
		console.log('this is the tasks', this.tasks);
	});
	child.on('error', error => console.log(`Error in starting up the child process: ${error}`));
	child.on('exit', code => console.log(`Child Process exited with code ${code} ${exitCodes[code] || ''}`));
	child.stdout.setEncoding('utf8');
	child.stderr.setEncoding('utf8');
	child.stdout.on('data', data => console.log('child says', data));
	child.stderr.on('data', err => console.log('error says', err));
	//save the child process
	this.process = child;
}

PinMaster.prototype.digitalWrite = function(queryPin, value){
	const isWriteable = this.digitalWritePins.some(pin => pin === queryPin),
		child = this.process;

	return new Promise((resolve, reject) => {
		if(!isWriteable) return reject(`Pin ${queryPin} is not set up to be a digital writeable pin.`);
		const id = (new Date()).toString(),
			data = Object.assign({}, { id, value }, { direction: 'out'});

		console.log('this is hte data that i am sending', data);
		//assign a callback
		this.tasks[id] = function(error, reply){
			if(error) return reject(error);
			resolve(reply);
		};

		//send a message
		child.send(data);
	});
}

module.exports = PinMaster;