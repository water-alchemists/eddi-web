'use strict';
module.exports = function(sequelize, DataTypes){
	const properties = {
			salinityOut : {
				type : DataTypes.INTEGER,
				allowNull: false,
			},
			id : {
				type : DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement : true,
			}
		},
		methods = {
			freezeTableName: true,
			classMethods : {
				getLatest : function(){
					return this.max('id')
							.then(id => this.findById(id));
				},
				getEarliest : function(){
					return this.min('id')
							.then(id => this.findById(id));
				}
			},
			instanceMethods: {

			}
		},
		Input = sequelize.define('Input', properties, methods);

	return Input;
};