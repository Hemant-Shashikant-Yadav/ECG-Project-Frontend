import initSqlJs from 'sql.js';

let db: any = null;

export const initDB = async () => {
  if (db) return db;
  
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });
  
  db = new SQL.Database();
  
  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('doctor', 'patient')) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ecg_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      image_data TEXT NOT NULL,
      prediction TEXT NOT NULL,
      confidence REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS signal_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ecg_record_id INTEGER NOT NULL,
      signal_number INTEGER NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (ecg_record_id) REFERENCES ecg_records(id)
    );
  `);

  return db;
};