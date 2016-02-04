'use strict';
const express = require('express');

const apiRoutes = require('./routes'),
	mainRoutes = require('./main'),
	middlewares = require('./middlewares'),
	models = require('./models'),
	seed = require('./seed'),
	childProcesses = require('./processes'),
	config = require('./config');

const PORT = 3991,
	app = express();

middlewares(app);
app.use('/api', apiRoutes(app));
mainRoutes(app);
childProcesses(config);

models.sequelize.drop() // drops all previous tables in db
	.then(() => models.sequelize.sync()) // creates all tables defined 
	.then(() => seed(models.sequelize)) // seeds all the tables
	.then(() => {
		app.listen(PORT, function(){
			console.log(`Server listening on port', ${PORT} ...`);
		});
	});
