var express = require('express');

var routes = require('./routes'),
	middlewares = require('./middlewares');

var PORT = 3000,
	app = express();

routes(app);

app.listen(PORT, function(){
	console.log(['Server listening on port', PORT, '...'].join(' '));
});