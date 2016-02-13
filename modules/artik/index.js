'use strict';
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

function isValidDigitalPin(pin){
	return new Promise((resolve, reject) => {
		if(!map.gpio[pin]) return reject(new Error(`This is not a valid gpio pin : ${pin}`));
		resolve();
	});
}

function getExportedGpio(){
	console.log('getting list of gpio pins');
	const gpioListPath = `${gpioBasePath}/export`;
	return promises.readFile(gpioListPath);
}

function isDigitalPinExported(pin){
	const gpioPinPath = `${gpioBasePath}/gpio${pin}`
	return isValidDigitalPin(pin)
		.then(() => promises.checkPathExists(gpioPinPath));
}

function exportDigitalPin(pin){
	const gpioExportPath = `${gpioBasePath}/export`;
	return isValidDigitalPin(pin)
		.then(() => promises.writeFile(gpioExportPath, pin));
}

function unexportDigitalPin(pin){
	const gpioUnexportPath = `${gpioBasePath}/unexport`;
	return isValidDigitalPin(pin)
		.then(() => promises.writeFile(gpioUnexportPath, pin));
}

function setDigitalPinMode(pin, mode){
	const gpioPinPath = `${gpioBasePath}/gpio${pin}/direction`,
		values = {
			READ : 'in',
			WRITE : 'out'
		},
		data = values[mode];

	return new Promise((resolve, reject) => {
		if(!data) return reject(new Error(`${data} is not a valid input value to set pin.`));
		resolve();
	})
	.then(() => isValidDigitalPin(pin))
	.then(() => promises.writeFile(gpioPinPath, data));
}

function getDigitalPinMode(pin){
	const gpioPinPath = `${gpioBasePath}/gpio${pin}/direction`;

	return isValidDigitalPin(pin)
		.then(() => promises.readFile(gpioPinPath));
}

function digitalRead(pin){
	const gpioPinPath = `/sys/class/gpio/gpio${pin}/value`;
	return isValidDigitalPin(pin)
		.then(() => promises.readFile(gpioPinPath));
}

function digitalWrite(pin, value){
	const gpioPinPath = `/sys/class/gpio/gpio${pin}/value`,
		values = {
			HIGH : 1,
			LOW : 0
		},
		formattedValue = values[value];

	return new Promise((resolve, reject) => {
		if(!formattedValue) return reject(new Error(`This is not a valid value to set pin ${pin} : ${value}`));
		resolve();
	})
	.then(() => promises.writeFile(gpioPinPath, formattedValue));
}

function analogRead(pin){
	const analogPinPath = `/sys/devices/12d10000.adc/iio:device0/in_voltage${pin}_raw`;
	return promises.readFile(analogPinPath);
}

function getBoardInfo(){
	const boardInfoPath = '/proc/device-tree/model';
	return promises.readFile(boardInfoPath);
}

module.exports = {
	getExportedGpio,
	isDigitalPinExported,
	exportDigitalPin,
	unexportDigitalPin,
	setDigitalPinMode,
	getDigitalPinMode,
	digitalRead,
	digitalWrite,
	analogRead,
	getBoardInfo,
}