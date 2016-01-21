'use strict';

module.exports = function(sequelize, DataTypes){
	const properties = {
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
							.then(id => this.findById(id))
				},
			},
			instanceMethods: {
				
			}
		},
		Reading = sequelize.define('Reading', properties, methods);

	return Reading;
};