import { initDB } from './init';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
  created_at: string;
}

export const createUser = async (
  name: string, 
  email: string, 
  password: string, 
  role: 'doctor' | 'patient'
): Promise<User> => {
  const db = await initDB();
  const stmt = db.prepare(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
  );
  stmt.run([name, email, password, role]);
  return getUserByEmail(email);
};

export const validateUser = async (
  email: string, 
  password: string
): Promise<User | null> => {
  const db = await initDB();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
  const result = stmt.get([email, password]);
  return result || null;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const db = await initDB();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get([email]);
};