const Database = require('better-sqlite3');

// db connection, autocreating db file
const db = new Database('database.db');

// adding migration
const initDB = () => {
  const migration = `
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      is_rented BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.exec(migration);
};

module.exports = { db, initDB };