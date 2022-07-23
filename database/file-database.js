// Load modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// connect with SQLite database
const databasePath = path.join(__dirname, '../.db', 'database.db');

// connecting to file database
const appDatabase = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.error(err.message);
    }
    console.log('Successful connected to the database');
});

//this is a helper function to run queries in better way than the default of sqlite3
exports.query = (command, method = 'all', insert = false) => {
    return new Promise((resolve, reject) => {
        appDatabase[method](command, function (error, result) {
            if (error) {
                reject(error);
            } else {
                if (insert) {
                    // in case of inserting new record return the ID of that record
                    resolve({ lastID: this.lastID })
                } else {
                    resolve(result);
                }
            }
        });
    });
};
