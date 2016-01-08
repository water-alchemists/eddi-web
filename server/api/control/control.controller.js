'use strict';

function getAll(req, res){
	console.log('this is the request', req);
	res.send('lol');
}

module.exports = {
	getAll : getAll
};