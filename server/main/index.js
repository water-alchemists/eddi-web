'use strict';
const controllers = require('./main.controller');

module.exports = function(app){
	app.get('/', controllers.getMain);

	return app;
}