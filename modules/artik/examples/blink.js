'use strict';
require('es6-shim');
import * as Artik from '../artik';

Artik.getExportedGpio().then(function(data){
	console.log('this is the data', data);
}).catch(function(err){
	console.log('this is the err', err);
})