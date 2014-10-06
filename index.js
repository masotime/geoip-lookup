'use strict';

var levelup = require('level'),
	scraper = require('qscraper'),
	Q = require('q');

var db = levelup('./iplookup', {
	createIfMissing: true,
	errorIfExists: false,
	compression: true,
	valueEncoding: 'json'
});

module.exports = {
	'lookup': function(ip, callback) {
		db.get(ip, function(err, value) {
			if (err) {
				if (err.notFound) {
					// don't block
					callback();
					setImmediate(function() {
						// try and find it, so that future calls will have access
						var session;
						session = scraper.session();
						session.getJson('https://www.maxmind.com/geoip/v2.1/city/'+ip+'?demo=1')
							.then(function(json) {
								return Q.ninvoke(db, 'put', ip, json);
							}).catch(function(err) {
								console.error('Could not get location info for '+ip, err, err.stack);
							});
					});
					return;
				} else {
					return callback(err);	
				}
			} else {
				return callback(null, value);
			}
		});
	}
};