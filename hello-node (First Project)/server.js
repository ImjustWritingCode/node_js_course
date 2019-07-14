var http = require('http');
var port = 3000;

var requestHandler = (request, response) => {
	console.log('New request from: ' + request.url);
	response.end('Hello, World!');
}

var svr = http.createServer(requestHandler);
svr.listen(port, () => {
	console.log('listening on port ' + port);
});