export interface Patient {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
  medical_history?: string;
  created_at?: Date;
}

export interface Doctor {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  specialization: string;
  experience: number;
  designation: string;
  contact: string;
  created_at?: Date;
}

export interface ECGRecord {
  id: string;
  patientEmail: string;
  originalImageUrl: string;
  prediction: string;
  timestamp: Date;
}