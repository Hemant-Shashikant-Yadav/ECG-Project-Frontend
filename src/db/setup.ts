import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('healthcare.db');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('doctor', 'patient')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create ECG records table
db.exec(`
  CREATE TABLE IF NOT EXISTS ecg_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_path TEXT NOT NULL,
    prediction TEXT NOT NULL,
    confidence REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Create signal data table
db.exec(`
  CREATE TABLE IF NOT EXISTS signal_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ecg_record_id INTEGER NOT NULL,
    signal_number INTEGER NOT NULL,
    data TEXT NOT NULL,
    FOREIGN KEY (ecg_record_id) REFERENCES ecg_records(id)
  );
`);

export const createUser = (name: string, email: string, password: string, role: 'doctor' | 'patient') => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
  return stmt.run(name, email, hashedPassword, role);
};

export const validateUser = (email: string, password: string) => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(email);
  
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.password)) return null;
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const saveECGRecord = (
  userId: number,
  imagePath: string,
  prediction: string,
  confidence: number,
  signalData: number[][]
) => {
  const insertRecord = db.prepare(
    'INSERT INTO ecg_records (user_id, image_path, prediction, confidence) VALUES (?, ?, ?, ?)'
  );
  const insertSignal = db.prepare(
    'INSERT INTO signal_data (ecg_record_id, signal_number, data) VALUES (?, ?, ?)'
  );

  db.transaction(() => {
    const result = insertRecord.run(userId, imagePath, prediction, confidence);
    const recordId = result.lastInsertRowid;
    
    signalData.forEach((signal, index) => {
      insertSignal.run(recordId, index + 1, JSON.stringify(signal));
    });
  })();
};

export const getECGHistory = (userId: number) => {
  const stmt = db.prepare(`
    SELECT 
      r.*,
      GROUP_CONCAT(s.data) as signals
    FROM ecg_records r
    LEFT JOIN signal_data s ON r.id = s.ecg_record_id
    WHERE r.user_id = ?
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `);
  
  const records = stmt.all(userId);
  return records.map(record => ({
    ...record,
    signals: record.signals ? record.signals.split(',').map(JSON.parse) : []
  }));
};

export default db;