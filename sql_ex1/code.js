var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');

db.serialize(()=>{
	// create table
	db.run('CREATE TABLE Contacts (first_name TEXT, last_name TEXT, age INTEGER)');

	// insert values
	db.run('INSERT INTO Contacts VALUES ("Tony", "Chiang", 20)');
	db.run('INSERT INTO Contacts VALUES ("Sophia", "Chiang", 14)');
	db.run('INSERT INTO Contacts VALUES ("Cherry", "Wang", 20)');

	// queries
	db.all('SELECT * FROM Contacts', processRows);
	db.each('SELECT * FROM Contacts', processRow);
	db.each('SELECT * FROM Contacts WHERE last_name = "Chiang"', processRow);
	var firstName = 'Tony';
	db.get('SELECT * FROM Contacts WHERE first_name = ?', [firstName], (err, row)=>{
		if (err) {
			console.log("Err: " + err.message);
		} else {
			console.log("Age of Tony is ");
			console.log(row.age);
		}
	});
});

function processRows(err, rows){
	console.log("called process rowS");
	if (err) {
		console.log("err: " + err.message);
	} else {
		for (var i = 0;i < rows.length;i++) {
			console.log(rows[i].first_name);
		}
	}
}

function processRow(err, row) {
	console.log("called process row");
	if (err) {
		console.log("err: " + err.message);
	} else {
		console.log(row.first_name);
	}
}

db.close();