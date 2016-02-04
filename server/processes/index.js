'use strict';
//spawns child processes
module.exports = function(config){
	const pins = config.pins;

	//set up child process for pins
	require('./pins')(Object.assign({}, pins));
};