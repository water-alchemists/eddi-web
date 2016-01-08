'use strict';
module.exports = function(models){
	const Pin = models.model('Pin');
	return Pin.create({
		pin : 11,
		state : true,
	});

};