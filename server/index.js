var express = require('express');

var routes = require('./routes'),
	middlewares = require('./middlewares'),
	models = require('./models');

var PORT = 3991;
var app = express();
app.set('view engine', 'jade');

routes(app);
middlewares(app);

app.get('/', function(req, res){
	res.render('eddi-main', {
		cards: [
			{
				title: "Flow Rate",
				value: "3.2",
				unit: "liters per minute"
			},{
				title: "Salinity In",
				value: "1024",
				unit: "parts per million"
			},{
				title: "Salinity Out",
				value: "387",
				unit: "parts per million"
			}
		],
		title: "Greenhouse 1",
	});
});

models.sequelize.sync().then(() => {
	app.listen(PORT, function(){
		console.log(['Server listening on port', PORT, '...'].join(' '));
	});
});
