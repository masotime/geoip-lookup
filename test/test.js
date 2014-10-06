'use strict';

var geoip = require('../index'),
	Q = require('q');

Q.longStackSupport = true;

var lookup = Q.denodeify(geoip.lookup);
var ips = [
	'216.113.168.131',
	'202.73.36.19',
	'104.131.143.209'
];

ips.map(function mapIps(ip) {
	lookup(ip).then(function firstResult(result) {
		console.log('first attempt - ',result);
		return lookup(ip);
	}).then(function secondResult(result) {
		console.log(result);
	}).done();
})
