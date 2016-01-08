var express = require('express');

var routes = require('./routes'),
	middlewares = require('./middlewares'),
	models = require('./models'),
	seed = require('./seed');

var PORT = 3991,
	app = express();

middlewares(app);
app.use('/api', routes(app));

app.get('/', function(req, res){
	res.send('hello world');
});

models.sequelize.drop() // drops all previous tables in db
	.then(() => models.sequelize.sync()) // creates all tables defined 
	.then(() => seed(models.sequelize)) // seeds all the tables
	.then(() => {
		app.listen(PORT, function(){
			console.log(['Server listening on port', PORT, '...'].join(' '));
		});
	});