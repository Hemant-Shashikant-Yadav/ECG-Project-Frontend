import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePatient } from '../db/database';
import { usePatient } from '../hooks/usePatient';
import type { Patient } from '../types/models';
import DashboardLayout from './layout/DashboardLayout';
import PatientInfo from './patient/PatientInfo';
import ECGHistory from './patient/ECGHistory';
import PatientEditModal from './PatientEditModal';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorDisplay from './common/ErrorDisplay';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { patient, loading, error, setPatient } = usePatient();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!patient) {
    navigate('/auth');
    return null;
  }

  const handleSave = async (updatedPatient: Patient) => {
    try {
      await updatePatient(updatedPatient);
      setPatient(updatedPatient);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update patient:', err);
    }
  };

  return (
    <DashboardLayout title="HeartGuard AI - Patient Portal">
      <PatientInfo patient={patient} onEdit={() => setIsEditing(true)} />
      <ECGHistory />
      
      {isEditing && (
        <PatientEditModal
          patient={patient}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}