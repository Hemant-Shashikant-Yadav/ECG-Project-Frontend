const API_URL = 'http://localhost:5000/api';

export async function register(userData: any, role: 'patient' | 'doctor') {
  const response = await fetch(`${API_URL}/auth/${role}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  
  return response.json();
}

export async function login(email: string, password: string, role: 'patient' | 'doctor') {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  
  return response.json();
}

export async function getPatient(email: string) {
  const response = await fetch(`${API_URL}/patients/${email}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch patient data');
  }
  
  return response.json();
}

export async function updatePatient(email: string, data: any) {
  const response = await fetch(`${API_URL}/patients/${email}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update patient data');
  }
  
  return response.json();
}

export async function saveECGRecord(record: any) {
  const response = await fetch(`${API_URL}/ecg`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save ECG record');
  }
  
  return response.json();
}

export async function getPatientECGRecords(email: string) {
  const response = await fetch(`${API_URL}/ecg/patient/${email}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch ECG records');
  }
  
  return response.json();
}