import { useState, useEffect } from 'react';
import { getPatientByEmail } from '../db/database';
import type { Patient } from '../types/models';

export function usePatient() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const email = sessionStorage.getItem('userEmail');
        if (!email) {
          throw new Error('No user email found');
        }
        const patientData = await getPatientByEmail(email);
        if (patientData) {
          setPatient(patientData);
        } else {
          setError('Patient not found');
        }
      } catch (err) {
        setError('Failed to load patient data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPatientData();
  }, []);

  return { patient, loading, error, setPatient };
}