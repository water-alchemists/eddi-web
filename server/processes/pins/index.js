'use strict';
const PinMaster = require('../../../modules/artik/PinMaster');

module.exports = function(pinMap){
	//Singleton pattern
	var pinInstance;
	const init = () => new PinMaster(pinMap);
 
	if(pinInstance) return pinInstance;
	else {
		pinInstance = init();
		return pinInstance;
	}

}