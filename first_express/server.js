var express = require('express');
var app = express();
var port = 3000;

app.listen(port, ()=>{
	console.log('Listening port ' + port);
});

app.get('/', (request, response)=>{
	response.send('Welcome to Tony\'s server!');
});