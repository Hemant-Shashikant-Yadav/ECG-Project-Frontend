import React from 'react';
import { Edit2 } from 'lucide-react';
import type { Patient } from '../../types/models';

interface PatientInfoProps {
  patient: Patient;
  onEdit: () => void;
}

export default function PatientInfo({ patient, onEdit }: PatientInfoProps) {
  return (
    <div className="mb-6 bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <button
          onClick={onEdit}
          className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Profile
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="mt-1 text-lg text-gray-900">{patient.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="mt-1 text-lg text-gray-900">{patient.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Age</p>
          <p className="mt-1 text-lg text-gray-900">{patient.age} years</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Gender</p>
          <p className="mt-1 text-lg text-gray-900 capitalize">{patient.gender}</p>
        </div>
        {patient.weight && (
          <div>
            <p className="text-sm font-medium text-gray-500">Weight</p>
            <p className="mt-1 text-lg text-gray-900">{patient.weight} kg</p>
          </div>
        )}
        {patient.height && (
          <div>
            <p className="text-sm font-medium text-gray-500">Height</p>
            <p className="mt-1 text-lg text-gray-900">{patient.height} cm</p>
          </div>
        )}
      </div>

      {patient.medical_history && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">Medical History</p>
          <p className="mt-1 text-lg text-gray-900">{patient.medical_history}</p>
        </div>
      )}
    </div>
  );
}