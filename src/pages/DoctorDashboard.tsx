import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import PatientStatusCard from '../components/doctor/PatientStatusCard';
import PatientList from '../components/doctor/PatientList';
import { getPatients } from '../services/patientService';
import type { Patient } from '../types/patient';

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to fetch patient data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const criticalCount = patients.filter(p => p.status === 'Critical').length;
  const followUpCount = patients.filter(p => p.status === 'Follow-up Required').length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Doctor Dashboard</h1>
        
        {error && (
          <div className="mb-8 bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <PatientStatusCard
            title="Total Patients"
            count={patients.length}
            type="total"
          />
          <PatientStatusCard
            title="Pending Reviews"
            count={followUpCount}
            type="pending"
          />
          <PatientStatusCard
            title="Critical Cases"
            count={criticalCount}
            type="critical"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Patient List</h2>
          <PatientList patients={patients} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}