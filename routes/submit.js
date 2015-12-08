var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var http = require('http');
var dot = require('dot-object');
var request = require('request');

router.get('/', function (req, res, next) {
	console.log('a get');
});

router.post('/', function(req, res, next) {

	// form data
	var name = req.body.name;
	var start = new Date('December 17, 2015 12:25:00');
	var stime = 'Europe/London';
	var end = new Date('December 18, 2015 20:25:00');
	var etime = 'Europe/London';
	var currency = req.body.currency;

	var obj
	var event = {
		name : {
			html : name
		},
		start : {
			utc : start,
			timezone : stime
		},
		end : {
			utc: end,
			timezone: etime
		},
		currency : currency
	};
	var htmlData;

	request.post({
		url : 'https://www.eventbriteapi.com/v3/events/?token=OVJYRQ3E5UCTVNZGU5OP&event.name.html='+ encodeURIComponent(name) +'&event.start.utc=2015-12-13T10:39:35Z&event.start.timezone=Europe/London&event.end.utc=2015-12-13T10:39:35Z&event.currency='+ encodeURIComponent(currency) +'&event.end.timezone=Europe/London'
	}, function(error, response, body) {
		console.log('error: %s response: %s body: %s', error, response, body);
		res.end(body)
	});

	console.log('name: %s, start: %s, stime: %s, end: %s, etime: %s, currency: %s', name, start, stime, end, etime, currency);
});

module.exports = router;