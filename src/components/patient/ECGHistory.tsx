import React, { useState, useEffect } from 'react';
import { getPatientECGRecords } from '../../services/api';
import type { ECGRecord } from '../../types/models';
import ECGUpload from './ECGUpload';

export default function ECGHistory() {
  const [records, setRecords] = useState<ECGRecord[]>([]);

  const loadRecords = async () => {
    const email = sessionStorage.getItem('userEmail');
    if (email) {
      try {
        const patientRecords = await getPatientECGRecords(email);
        setRecords(patientRecords.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      } catch (error) {
        console.error('Failed to load ECG records:', error);
      }
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Your ECG History</h2>
      </div>

      <ECGUpload onUploadComplete={loadRecords} />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((record) => (
          <div key={record.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src={record.originalImageUrl}
              alt="ECG"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">
                {new Date(record.timestamp).toLocaleString()}
              </p>
              <p className="mt-2 font-medium text-gray-900">
                Prediction: {record.prediction}
              </p>
            </div>
          </div>
        ))}
      </div>

      {records.length === 0 && (
        <div className="mt-4 bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No ECG records found. Upload your first ECG image to get started.
        </div>
      )}
    </div>
  );
}