import type { Patient, Doctor, ECGRecord } from '../types/models';

const API_URL = 'http://localhost:5000/api';

// Authentication endpoints
export async function register(userData: Omit<Patient | Doctor, 'created_at'>, role: 'patient' | 'doctor') {
  try {
    const response = await fetch(`${API_URL}/auth/${role}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw new Error('Registration failed: Unknown error occurred');
  }
}

export async function login(email: string, password: string, role: 'patient' | 'doctor') {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Invalid credentials');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error('Login failed: Unknown error occurred');
  }
}

// Patient endpoints
export async function getPatient(email: string) {
  try {
    const response = await fetch(`${API_URL}/patients/${email}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to fetch patient data');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch patient: ${error.message}`);
    }
    throw new Error('Failed to fetch patient: Unknown error occurred');
  }
}

export async function updatePatient(email: string, data: Partial<Patient>) {
  try {
    const response = await fetch(`${API_URL}/patients/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || responseData.message || 'Failed to update patient data');
    }

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update patient: ${error.message}`);
    }
    throw new Error('Failed to update patient: Unknown error occurred');
  }
}

// ECG endpoints
export async function saveECGRecord(record: Omit<ECGRecord, 'id' | 'timestamp'>) {
  try {
    const response = await fetch(`${API_URL}/ecg`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to save ECG record');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to save ECG record: ${error.message}`);
    }
    throw new Error('Failed to save ECG record: Unknown error occurred');
  }
}

export async function getPatientECGRecords(email: string): Promise<ECGRecord[]> {
  try {
    const response = await fetch(`${API_URL}/ecg/patient/${email}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to fetch ECG records');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ECG records: ${error.message}`);
    }
    throw new Error('Failed to fetch ECG records: Unknown error occurred');
  }
}

export async function getAllECGRecords(): Promise<ECGRecord[]> {
  try {
    const response = await fetch(`${API_URL}/ecg`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to fetch ECG records');
    }

    return data.records || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ECG records: ${error.message}`);
    }
    throw new Error('Failed to fetch ECG records: Unknown error occurred');
  }
}