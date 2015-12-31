'use strict';

module.exports = function(sequelize, DataTypes){
	const properties = {
			time : {
					type : DataTypes.DATE, 
					defaultValue : DataTypes.NOW, 
					primaryKey : true, 
					allowNull: false,
				},
			salinityIn : {
					type : DataTypes.INTEGER,
					allowNull: false,
				},
			salinityOut : {
					type : DataTypes.INTEGER,
					allowNull: false,
				},
			flowRate : {
					type : DataTypes.INTEGER,
					allowNull: false,
				},
		},
		methods = {
			
		},
		Reading = sequelize.define('Reading', properties, methods);

	return Reading;
};