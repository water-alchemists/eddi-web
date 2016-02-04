'use strict'
module.exports = {
	pins : {
		analog : [
			'A0', 
			'A1',
			'A2',
			'A3',
			'A4'
		],
		digitalRead : [3],
		digitalWrite : [
			2,
			3,
			4,
			8,
			9,
			10,
			11,
			12,
			13
		]
	},
	development : {
		db : {
			database : '',
			username : '',
			password: '',
			dialect : 'sqlite',
			host: 'localhost',
			storage: './eddi.sqlite'
		},
	},
}