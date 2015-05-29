'use strict';

var levelup = require('level'),
	db = levelup('./iplookup', {
		createIfMissing: true,
		errorIfExists: false,
		compression: true,
		valueEncoding: 'json'
	}, function (err, db) {
		if (err) {
			console.error(err.stack);
			throw err;
		}
	});

module.exports = db;