const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'dramabox.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Drop the old table if it exists to apply the new schema
    db.run("DROP TABLE IF EXISTS api_keys", (err) => {
        if (err) {
            console.error("Error dropping table", err.message);
        } else {
            console.log("Table 'api_keys' dropped, recreating with new schema for GMT+7 timestamps.");
            db.run(`CREATE TABLE IF NOT EXISTS api_keys (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              telegram_username TEXT NOT NULL UNIQUE,
              api_key TEXT NOT NULL UNIQUE,
              created_at TEXT,
              updated_at TEXT,
              last_used_at TEXT
            )`, (err) => {
              if (err) {
                console.error("Error creating table", err.message);
              } else {
                console.log("Table 'api_keys' is ready with the new schema.");
              }
            });
        }
    });
  }
});

module.exports = db;
