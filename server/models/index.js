"use strict";
const fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize'),
	config = require(__dirname + '/../config'),
	dbConfig = config.development.db;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig),
	db = {};

fs.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	})
	.forEach(function(file) {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;