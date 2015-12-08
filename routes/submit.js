var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var http = require('http');

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
	// post data
	var post_options = {
		host: 'https://www.eventbriteapi.com',
		port: 80,
		path: '/v3/events/?token=OVJYRQ3E5UCTVNZGU5OP',
		method: 'POST',
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded',
			'Content-Length' : Buffer.byteLength(JSON.stringify(event))
		}
	};



	var httpreq = http.request(post_options, function (response) {
		//console.log(response);
		//response.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
		response.on('data', function(chunk) {
			htmlData = chunk;
			console.log('%s', chunk);
			res.write(htmlData);
		});
		response.on('end', function () {
			res.send('ok')
		});
	});
	httpreq.write(JSON.stringify(event));
  	httpreq.end();

	

	console.log('name: %s, start: %s, stime: %s, end: %s, etime: %s, currency: %s', name, start, stime, end, etime, currency);
});

module.exports = router;