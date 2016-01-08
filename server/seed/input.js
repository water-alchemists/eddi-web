'use strict';
module.exports = function(models){
	const Input = models.model('Input');
	return Input.create({
		salinityOut: '35',
	});

};