const fs = require('fs');
const sqlite3 = require('sqlite3');

// don't forget this runs via docker-compose command, which is same directory as the .db folder
// in case we need to use file database
const databasePath = '.db/database.db';
try {
    if (fs.existsSync(databasePath)) {
        console.log('database exists');
        return;
    }
} catch (error) {
    console.log(error)
}

let db = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
    if (error && error.code == "SQLITE_CANTOPEN") {
        createNewDatabase();
        return;
    } else if (error) {
        console.log(error);
        return;
    } else {
        createTables(db);
        return;
    }
});

function createNewDatabase() {
    // create new file database
    const newDatabase = new sqlite3.Database(databasePath, (error) => {
        if (error) {
            console.log(error);
            return;
        }
    });

    // create new database
    createTables(newDatabase);

    // closing connection
    newDatabase.close(error => {
        console.log(error);
        return;
    });
}

function createTables(newDatabase) {
    console.log('creating tables ...')
    newDatabase.exec(`
        create table department (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            parent_id INTEGER NOT NULL DEFAULT 0
        );

        insert into department (name, parent_id)
            values ('Engineering', 0),
                ('Platform', 1),
                ('Banking', 0),
                ('Loan', 3),
                ('Operations', 0),
                ('CustomerOnboarding', 5),
                ('Administration', 0),
                ('Agriculture', 7),
                ('Data', 1),
                ('Development', 1),
                ('Marketing', 5),
                ('HR', 7);

        create table staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            salary DECIMAL(15,2) NOT NULL,
            currency TEXT NOT NULL,
            on_contract INTEGER DEFAULT 0,
            department_id INTEGER NOT NULL,
            sub_department_id INTEGER NOT NULL
        );
    `);
}