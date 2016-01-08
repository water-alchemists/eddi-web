'use strict';
module.exports = function(models){
	const Reading = models.model('Reading');
	return Reading.create({
		salinityIn : 35,
		salinityOut : 25,
		flowRate : 10,
	});
};