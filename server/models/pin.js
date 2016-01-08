'use strict';

module.exports = function(sequelize, DataTypes){
	const properties = {
			time : {
				type : DataTypes.INTEGER,
				defaultValue : DataTypes.NOW, 
				allowNull: false,
			},
			pin : {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			state : {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		methods = {
			freezeTableName: true,
		},
		Pin = sequelize.define('Pin', properties, methods);

	return Pin;
};