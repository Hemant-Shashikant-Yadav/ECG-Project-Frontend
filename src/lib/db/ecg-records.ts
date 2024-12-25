import { initDB } from './init';

export interface ECGRecord {
  id: number;
  user_id: number;
  image_data: string;
  prediction: string;
  confidence: number;
  created_at: string;
  signals?: number[][];
}

export const saveECGRecord = async (
  userId: number,
  imageData: string,
  prediction: string,
  confidence: number,
  signalData: number[][]
): Promise<ECGRecord> => {
  const db = await initDB();
  
  db.run('BEGIN TRANSACTION');
  
  try {
    const recordStmt = db.prepare(
      'INSERT INTO ecg_records (user_id, image_data, prediction, confidence) VALUES (?, ?, ?, ?)'
    );
    recordStmt.run([userId, imageData, prediction, confidence]);
    
    const recordId = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    
    const signalStmt = db.prepare(
      'INSERT INTO signal_data (ecg_record_id, signal_number, data) VALUES (?, ?, ?)'
    );
    
    signalData.forEach((signal, index) => {
      signalStmt.run([recordId, index + 1, JSON.stringify(signal)]);
    });
    
    db.run('COMMIT');
    return getECGRecord(recordId);
  } catch (error) {
    db.run('ROLLBACK');
    throw error;
  }
};

export const getECGRecord = async (id: number): Promise<ECGRecord> => {
  const db = await initDB();
  const record = db.prepare('SELECT * FROM ecg_records WHERE id = ?').get([id]);
  const signals = db.prepare(
    'SELECT data FROM signal_data WHERE ecg_record_id = ? ORDER BY signal_number'
  ).all([id]);
  
  return {
    ...record,
    signals: signals.map(s => JSON.parse(s.data))
  };
};

export const getECGHistory = async (userId: number): Promise<ECGRecord[]> => {
  const db = await initDB();
  const records = db.prepare(
    'SELECT * FROM ecg_records WHERE user_id = ? ORDER BY created_at DESC'
  ).all([userId]);
  
  return Promise.all(records.map(r => getECGRecord(r.id)));
};