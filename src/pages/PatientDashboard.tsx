import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import ECGUpload from '../components/patient/ECGUpload';
import ECGResults from '../components/patient/ECGResults';
import { saveECGRecord } from '../lib/db/ecg-records';
import { fileToBase64 } from '../lib/utils/imageUtils';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [result, setResult] = useState<null | {
    prediction: string;
    confidence: number;
    signalData: number[][];
    images: string[];
  }>(null);

  const handleUpload = async (file: File) => {
    if (!user) return;

    // Convert image to base64
    const imageData = await fileToBase64(file);

    // TODO: Replace with actual AI prediction service
    const mockResult = {
      prediction: "Normal Sinus Rhythm",
      confidence: 95.5,
      signalData: [
        Array.from({ length: 100 }, () => Math.random()),
        Array.from({ length: 100 }, () => Math.random())
      ],
      images: Array(6).fill(imageData)
    };

    // Save to database
    await saveECGRecord(
      user.id,
      imageData,
      mockResult.prediction,
      mockResult.confidence,
      mockResult.signalData
    );

    setResult(mockResult);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ECG Analysis Dashboard</h1>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Upload ECG</h2>
            <ECGUpload onUpload={handleUpload} />
          </div>

          {result && <ECGResults result={result} />}
        </div>
      </div>
    </Layout>
  );
}