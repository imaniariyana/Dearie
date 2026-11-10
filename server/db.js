
// Import Node.js's built-in SQLite database
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

// Create or open our database file
const db = new DatabaseSync(path.join(__dirname, "dearie.db"));

// Create a table for users
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

// Create a table for mood entries
db.exec(`
  CREATE TABLE IF NOT EXISTS moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

// Export the database so other files can use it
module.exports = db;
