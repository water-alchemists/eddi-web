'use strict';

module.exports = function(sequelize, DataTypes){
	const properties = {
			pin : {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			state : {
				type: DataTypes.BOOLEAN,
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
				}
			},
			instanceMethods: {
				
			}
		},
		Pin = sequelize.define('Pin', properties, methods);

	return Pin;
};