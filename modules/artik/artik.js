'use strict';
const fs = require('fs');

const promises = require('../promises');

// echo -n "27" > /sys/class/gpio/export
// echo -n "out" > /sys/class/gpio/gpio27/direction

const gpioBasePath = '/sys/class/gpio',
	map = {
	gpio : {
		2 : 8,
		3 : 9,
		4 : 10,
		7 : 11,
		8 : 12,
		9 : 13,
		10 : 14,
		11 : 16,
		12 : 21,
		13 : 22
	}
};

function getExportedGpio(){
	console.log('getting list of gpio pins');
	const gpioListPath = `${gpioBasePath}/export`;
	return new Promise((resolve, reject) => {
		fs.readFile(gpioListPath, (err, data) => {
			if(err) return reject(err);
			return data;
		});
	})
}

function digitalPinMode(pin, direction){
	return new Promise((resolve, reject) => {
		const gpioPinPath = `/sys/class/gpio/gpio${pin}/direction`,
			values = {
				INPUT : 'in',
				OUTPUT : 'out'
			};

		//may not use a map, just use array for now
		if(!map.gpio[pin]) return reject(new Error(`This is not a valid gpio pin : ${pin}`));
		if(!values[direction]) return reject(new Error(`This is not a valid direction to set gpio pin ${pin} : ${direction}`))

		console.log(`checking to see if pin ${pin} exists`);
		fs.appendFile(gpioListPath, `${pin}`, (err) => {
			if(err) return reject(err);
			fs.writeFile(gpioPinPath, values[direction], (err, data) => {
				if(err) return reject(err);
				resolve(data);
			});
		});
	});
}

function digitalRead(pin){
	return new Promise((resolve, reject) => {
		const gpioPinPath = `/sys/class/gpio/gpio${pin}/value`;

		fs.readFile(gpioPinPath, (err, data) => {
			if(err) return reject(err);
			resolve(data);
		});
	});
}

function digitalWrite(pin, value){
	return new Promise((resolve, reject) => {
		const gpioPinPath = `/sys/class/gpio/gpio${pin}/value`,
			values = {
				HIGH : 1,
				LOW : 0
			},
			formattedValue = values[value];

		if(!formattedValue) return reject(`This is not a valid value to set pin ${pin} : ${value}`);

		fs.writeFile(gpioPinPath, `${formattedValue}\n`, (err, data) => {
			if(err) return reject(err);
			resolve(data);
		});

	});
}

function analogRead(pin){
	return new Promise((resolve, reject) => {
		const analogPinPath = `/sys/devices/12d10000.adc/iio:device0/in_voltage${pin}_raw`;

		fs.readFile(analogPinPath, (err, data) => {
			if(err) return reject(err);
			resolve(data);
		});
	});
}

function getBoardInfo(){
	return new Promise((resolve, reject) => {
		const boardInfoPath = '/proc/device-tree/model';

		fs.readFile(boardInfoPath, (err, data) => {
			if(err) return reject(err);
			resolve(data);
		});
	});
}

module.exports = {
	getExportedGpio,
	digitalPinMode,
	digitalRead,
	digitalWrite,
	analogRead,
	getBoardInfo,
}