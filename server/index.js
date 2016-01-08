const express = require('express');

const routes = require('./routes'),
	middlewares = require('./middlewares'),
	models = require('./models'),
	seed = require('./seed');

const PORT = 3991,
	app = express();

//sets templating engine to jade
app.set('view engine', 'jade');

middlewares(app);
app.use('/api', routes(app));

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

models.sequelize.drop() // drops all previous tables in db
	.then(() => models.sequelize.sync()) // creates all tables defined 
	.then(() => seed(models.sequelize)) // seeds all the tables
	.then(() => {
		app.listen(PORT, function(){
			console.log(['Server listening on port', PORT, '...'].join(' '));
		});
	});
