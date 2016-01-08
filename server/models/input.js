'use strict';
module.exports = function(sequelize, DataTypes){
	const properties = {
			time : {
				type : DataTypes.INTEGER,
				defaultValue : DataTypes.NOW, 
				allowNull: false,
			},
			salinityOut : {
				type : DataTypes.INTEGER,
				allowNull: false,
			}
		},
		methods = {
			freezeTableName: true,
		},
		Input = sequelize.define('Input', properties, methods);

	return Input;
};