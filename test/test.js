/* global describe, it, beforeEach, assert */
'use strict';

var geoip = require('../index'),
	db = require('../database'),
	assert = require('assert'),
	Q = require('q');

Q.longStackSupport = true;

describe('Basic functionality', function() {

	var lookup = function(ip) {
		var deferred = Q.defer();
		geoip.lookup(ip, function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});

		return deferred.promise;
	};

	var check = function(ip) {
		var deferred = Q.defer();
		geoip.check(ip, function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});

		return deferred.promise;
	};

	var ips = [
		'216.113.168.131',
		'202.73.36.19',
		'104.131.143.209'
	];

	var dbDel = function(key) {
		var deferred = Q.defer();

		db.del(key, function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});

		return deferred.promise;
	};

	beforeEach(function(done) {
		var deleteAll = ips.map(dbDel);

		Q.all(deleteAll).then(function () {
			done();
		}).catch(function (err) {
			done(err);
		});
	});

	it('should lookup but not block', function(done) {
		Q.all(ips.map(lookup)).then(function(results) {
			results.map(function (val) {
				assert.equal(val, undefined);
			});
			return Q.delay(1000).then(function() { return ips.map(lookup); });
		}).then(function (results) {
			results.map(function (val) {
				assert.ok(val);
			});
			done();
		}).catch(function (err) {
			done(err);
		});
	});

	it('should check and return immediately', function(done) {
		Q.all(ips.map(check)).then(function(results) {
			results.map(function (val) {
				assert.ok(val);
			});
			done();
		}).catch(function (err) {
			done(err);
		});
	});	
});

