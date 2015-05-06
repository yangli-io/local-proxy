var http = require('http');
var request = require('request');
var fs = require('fs');

var port = process.env.PORT || 8001;
var url = 'http://465d6aa8.ngrok.io';
var localhost = process.env.PORT ? 'https://jandcad.herokuapp.com' : 'http://localhost:8001';

var cache = [];

http.createServer(function(req, res){
	var options = {
		url: url + req.url
	}
	try{
		if (req.url.indexOf('.png') > -1 || req.url.indexOf('.otf') > -1 || req.url.indexOf('.ttf') > -1 || req.url.indexOf('.woff') > -1){
			options.encoding = null;
		}
	} catch (err) {

	}
	request.get(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {

	  	var contentType = response.headers['content-type']
	  	res.setHeader("Content-Type", contentType);
	  	if (contentType && contentType.indexOf('png') > -1 || req.url.indexOf('.otf') > -1 || req.url.indexOf('.ttf') > -1 || req.url.indexOf('.woff') > -1){
	  		//cache.push({url: options.url, pic: true, body: body});
	  		res.end(body, 'binary') // Show the HTML for the Google homepage. 
	  	} else {
	  		body = body.split('http://localhost').join(localhost);
	  		//cache.push({url: options.url, body: body});
	  		res.end(body);
	  	}
	  }
	})
}).listen(port);


console.log('server started');

