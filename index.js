const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null);
	console.log("Conected to server!");

	const db = client.db(dbname);
	//const collection =  db.collection
})