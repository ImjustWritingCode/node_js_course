var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./quotes.db');
var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));		// using bodyParser

/* var quotes = [
	{
		id: 1,
		quote: "We are not now that strength",
		author: "Alfred Tennyson",
		year: 1833
	},
	{
		id: 2,
		quote: "which in old days moved Earth and heaven",
		author: "Alfred Tennyson",
		year: 1833
	},
	{
		id: 3,
		quote: "That which we are, we are",
		author: "M",
		year: 2012
	},
	{
		id: 4,
		quote: "One equal temper of heroic hearts",
		author: "M",
		year: 2012
	}
]; */

app.listen(port, ()=>{
	console.log('Listening port ' + port);
});

app.get('/', (request, response)=>{
	response.send('Hi! Welcome to Tony\'s website!');
});

app.get('/quotes/:id', (req, res)=>{
	console.log("query: ID " + req.params.id);
	db.get('SELECT * FROM quotes WHERE id = ?', [req.params.id], (err, row)=>{
		if (err) {
			console.log("err: " + err.message);
		} else {
			res.json(row);
		}
	});
});

app.get('/quotes', (req, res)=>{
	if(req.query.year){
		console.log("query year " + req.query.year);
		db.all('SELECT * FROM quotes WHERE year = ?', [req.query.year], (err, rows)=>{
			if (err) {
				console.log("err: " + err.message);
			} else {
				res.json(rows);
			}
		});
	} else {
		console.log("get all quotes");
		db.all('SELECT * FROM quotes', (err, rows)=>{
			if (err) {
				console.log("err: " + err.message);
			} else {
				res.json(rows);
			}
		});
	}
});

// post function
app.post('/quotes', (req, res)=>{
	console.log("Client requested to insert a new quote: " + req.body.quote);
	res.json(req.body);
});