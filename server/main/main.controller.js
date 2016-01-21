'use strict';

function getMain(req, res){
	res.render('index', {
		cards: [
			{
				title: "Flow Rate",
				value: "3.2",
				unit: "liters per minute"
			},{
				title: "Salinity In",
				value: "1024",
				unit: "parts per million"
			},{
				title: "Salinity Out",
				value: "387",
				unit: "parts per million"
			}
		],
		title: "Greenhouse 1",
	});
}

module.exports = {
	getMain,
};