var http = require('http');
var request = require('request');
var fs = require('fs');

var port = process.env.PORT || 8001;
var url = 'http://40466884.ngrok.io';
var localhost = 'http://jandcad.herokuapp.com';

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
	  		res.setHeader("Server", response.headers.server);
		  	res.setHeader("Last-Modified", response.headers['last-modified']);
		  	res.setHeader("Accept-Ranges", response.headers['accept-ranges']);
		  	//res.setHeader("Content-Length", 4270);
		  	res.setHeader("ETag", response.headers.etag);
		  	fs.writeFileSync('./test.png', body, 'binary');
	  		res.end(body, 'binary') // Show the HTML for the Google homepage. 
	  	} else {
	  		body = body.split('http://localhost').join(localhost);
	  		res.end(body);
	  	}
	    
	  }
	})
}).listen(port);


console.log('server started');

