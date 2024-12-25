import { openDB } from 'idb';
import type { Patient, Doctor } from '../types/models';

const dbName = 'healthcareDB';
const dbVersion = 1;

const db = await openDB(dbName, dbVersion, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('patients')) {
      const patientStore = db.createObjectStore('patients', { keyPath: 'email' });
      patientStore.createIndex('email', 'email', { unique: true });
    }

    if (!db.objectStoreNames.contains('doctors')) {
      const doctorStore = db.createObjectStore('doctors', { keyPath: 'email' });
      doctorStore.createIndex('email', 'email', { unique: true });
    }
  },
});

export async function createPatient(patientData: Patient) {
  try {
    const created_at = new Date();
    return await db.add('patients', { ...patientData, created_at });
  } catch (error) {
    console.error('Error creating patient:', error);
    throw new Error('Failed to create patient account');
  }
}

export async function createDoctor(doctorData: Doctor) {
  try {
    const created_at = new Date();
    return await db.add('doctors', { ...doctorData, created_at });
  } catch (error) {
    console.error('Error creating doctor:', error);
    throw new Error('Failed to create doctor account');
  }
}

export async function getPatientByEmail(email: string): Promise<Patient | undefined> {
  try {
    return await db.get('patients', email);
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw new Error('Failed to fetch patient data');
  }
}

export async function getDoctorByEmail(email: string): Promise<Doctor | undefined> {
  try {
    return await db.get('doctors', email);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    throw new Error('Failed to fetch doctor data');
  }
}

export async function updatePatient(patientData: Patient) {
  try {
    return await db.put('patients', patientData);
  } catch (error) {
    console.error('Error updating patient:', error);
    throw new Error('Failed to update patient data');
  }
}

export async function updateDoctor(doctorData: Doctor) {
  try {
    return await db.put('doctors', doctorData);
  } catch (error) {
    console.error('Error updating doctor:', error);
    throw new Error('Failed to update doctor data');
  }
}

export default db;