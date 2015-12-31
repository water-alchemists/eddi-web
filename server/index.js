var express = require('express');

var routes = require('./routes'),
	middlewares = require('./middlewares'),
	models = require('./models');

var PORT = 3991,
	app = express();

routes(app);
middlewares(app);

app.get('/', function(req, res){
	res.send('hello world');
});

models.sequelize.sync().then(() => {
	app.listen(PORT, function(){
		console.log(['Server listening on port', PORT, '...'].join(' '));
	});
});