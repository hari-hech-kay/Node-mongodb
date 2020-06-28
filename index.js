const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null);
	console.log("Conected to server!");

	const db = client.db(dbname);
	// const collection = db.collection("dishes");
	// collection.insertOne({ "name": "Curd rice", "desc": "With Hatsun curd" }, (err, result) => {
	// 	assert.equal(err, null);

	// 	console.log("After Insert:\n");
	// 	console.log(result);

	// 	collection.find({}).toArray((err, docs) => {
	// 		assert.equal(err, null);

	// 		console.log("Found:\n");
	// 		console.log(docs);

	dboper.insertDocument(db,
		"dishes", { name: "Vadonut", description: "Test" }, (result) => {
			console.log("Insert Document:\n", result.ops);

			dboper.findDocuments(db, "dishes", (docs) => {
				console.log("Found Documents:\n", docs);

				dboper.updateDocument(db, "dishes", { name: "Vadonut" },
					{ description: "Updated Test" },
					(result) => {
						console.log("Updated Document:\n", result.result);

						dboper.findDocuments(db, "dishes", (docs) => {
							console.log("Found Updated Documents:\n", docs);

							db.dropCollection("dishes", (err, result) => {
								assert.equal(err, null);
								console.log(result);

								client.close();
							});
						});
					});
			});
		});
});