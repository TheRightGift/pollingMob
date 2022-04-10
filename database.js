import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "pollMedia.db";
const database_version = "1.0";
const database_displayname = "POLL database";
const database_size = 200000;

export default class Database {
	initDB() {
		let db;
		return new Promise((resolve) => {
		//console.log("Plugin integrity check ...");
		SQLite.echoTest()
			.then(() => {
			//console.log("Integrity check passed ...");
			//console.log("Opening database ...");
			SQLite.openDatabase(
				database_name,
				database_version,
				database_displayname,
				database_size
			)
				.then(DB => {
					db = DB;
					//console.log("Database OPEN");
					db.executeSql('SELECT 1 FROM User LIMIT 1').then(() => {
						//console.log("Database is ready ... executing query ...");
					}).catch((error) =>{
						console.log("Received error: ", error);
						//console.log("Database not yet ready ... populating data");
						db.transaction((tx) => {
							//cr8 user table
							tx.executeSql("CREATE TABLE IF NOT EXISTS user (id int(3) PRIMARY KEY, name varchar(100) NOT NULL, socketId varchar(100) DEFAULT NULL)");
								
						}).then(() => {
							//console.log("Table created successfully");
						}).catch(error => {
							//console.log(error);
						});
					});
					resolve(db);
				})
				.catch(error => {
					//console.log(error);
				});
			})
			.catch(error => {
				//console.log("echoTest failed - plugin not functional");
			});
		});
	};

	closeDatabase(db) {
		if (db) {
		console.log("Closing DB");
		db.close()
			.then(status => {
			console.log("Database CLOSED");
			})
			.catch(error => {
			this.errorCB(error);
			});
		} else {
		console.log("Database was not OPENED");
		}
	};

	addUser(user) {
		return new Promise((resolve) => {
			this.initDB().then((db) => {
				db.transaction((tx) => {					
					tx.executeSql('INSERT INTO User (id, name, socketId) VALUES (1, "'+user.name+'", "'+user.socketId+'")', []).then(([tx, results]) => {
						resolve(results);
					});
				}).then((result) => {
					//this.closeDatabase(db);
				}).catch((err) => {
					console.log(err);
				});
			}).catch((err) => {
				console.log(err);
			});
		});  
	};

	getUser(){
		return new Promise((resolve) => {
			const userSubj = [];
	
			this.initDB().then((db) => {
				db.transaction((tx) => {
					tx.executeSql("SELECT * FROM user", []).then(([tx,results]) => {
						var len = results.rows.length;
						
						for (let i = 0; i < len; i++) {
							let row = results.rows.item(i);
							
							const { id, name, socketId } = row;
							userSubj.push({
								id,
								name,
								socketId
							});
						}
						
						resolve(userSubj);
					});
				}).then((result) => {
					this.closeDatabase(db);
				}).catch((err) => {
					console.log(err);
				});
			}).catch((err) => {
				console.log(err);
			});
		});
	}	
}
